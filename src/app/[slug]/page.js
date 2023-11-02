import Main from "../../../components/Main";
import styles from "../home.module.css";
import {
  getNews,
  getAbout,
  getProjects,
  getContact,
} from "../../../sanity/sanity-utils";

export default async function Home({ params }) {
  const news = await getNews();
  const projects = await getProjects();
  const about = await getAbout();
  const contact = await getContact();

  return (
    <div className={styles.main}>
      <Main
        projects={projects}
        news={news}
        about={about[0]}
        contact={contact[0]}
        slug={params.slug}
      />
    </div>
  );
}

export const revalidate = 10;
