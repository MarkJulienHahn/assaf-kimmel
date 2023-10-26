import Placeholder from "../../components/Placeholder";
import styles from "./home.module.css";
import { getNews, getInfo } from "../../sanity/sanity-utils";

// type NewsProps = {
//   images:
// }

export default async function Home() {
  const news = await getNews();
  const info = await getInfo();

  return (
    <div className={styles.main}>
      <Placeholder news={news[0]} info={info[0]} />
    </div>
  );
}
