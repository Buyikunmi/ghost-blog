import ProgressBar from "../components/ProgressBar";
import "../styles/main.scss";
import "../styles/globals.scss";
import "../styles/post.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
