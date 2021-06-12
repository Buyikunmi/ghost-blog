import mitt from "next/dist/next-server/lib/mitt";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../../styles/Home.module.scss";

const { CONTENT_API_KEY, BLOG_URL } = process.env;

async function getPosts(slug: string) {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html,reading_time`
  ).then((res) => res.json());

  const posts = res.posts;

  // console.log(res);

  return posts[0];
}

export const getStaticProps = async ({ params }) => {
  const post = await getPosts(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

type Post = {
  title: string;
  html: string;
  slug: string;
};

const Post: React.FC<{ post: Post }> = (props) => {
  // console.log(props);

  const { post } = props;
  const [enableLoadComments, setEnableLoadComments] = useState<boolean>(true);
  const router = useRouter();

  function loadComments() {
    setEnableLoadComments(false);

    (window as any).disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = post.slug;
    };

    const script = document.createElement("script");
    script.src = "https://agik-ghost.disqus.com/embed.js";
    script.setAttribute("data-timestamp", Date.now().toString());

    document.body.appendChild(script);
  }

  if (router.isFallback) {
    return (
      <div className={styles.conatiner}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div id="post_container" className="container px-5">
      <Link href="/">
        <a className="button mt-2 go-back-button">Go Back</a>
      </Link>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>

      <div className="">
        {enableLoadComments && (
          <p className="button center-content" onClick={loadComments}>
            Load Comments
          </p>
        )}
        <div className={styles.disqus_container} id="disqus_thread"></div>
      </div>
    </div>
  );
};

export default Post;
