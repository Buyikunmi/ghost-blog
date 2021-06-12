import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import Link from "next/link";

import Header from "../components/Header";
// import ProgressBar from "../components/ProgressBar";

const { CONTENT_API_KEY, BLOG_URL } = process.env;

type Post = {
  title: String;
  slug: String;
  reading_time: Number;
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
    revalidate: 10,
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;
  // console.log(posts);
  return (
    <div className="container px-5">
      <Header />
      <h1>Hello 😊, Welcome to my blog </h1>

      <ul>
        {posts.map((post, index) => {
          return (
            <li className="post-article" key={index}>
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a className="post-title"> {post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
