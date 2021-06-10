import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import Link from "next/link";

const BLOG_URL = "http://18.221.243.227";
const CONTENT_API_KEY = "7cb7abfa30953aa54a42d9b316";

type Post = {
  title: String;
  slug: String;
};

async function getPosts() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,excerpt,reading_time`
  ).then((res) => res.json());

  const posts = res.posts;

  // console.log(res);

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;
  console.log(posts);
  return (
    <div className={styles.container}>
      <h1>Hello world 😊, Welcome to my blog</h1>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={index}>
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a> {post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
