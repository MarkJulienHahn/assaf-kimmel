import Placeholder from "../../components/placeholder/Placeholder";
import Main from "../../components/Main";
import styles from "./home.module.css";
import { getNews, getInfo } from "../../sanity/sanity-utils";


export default async function Home() {
  const news = await getNews();
  const info = await getInfo();

  return (
    <div className={styles.main}>
      <Main />
    </div>
  );
}

export const revalidate = 10;
