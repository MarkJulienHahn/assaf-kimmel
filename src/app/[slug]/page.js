import Main from "../../../components/Main";
import {
  getNews,
  getAbout,
  getProjects,
  getContact,
  getImprint
} from "../../../sanity/sanity-utils";

export default async function Home({ params }) {
  const news = await getNews();
  const projects = await getProjects();
  const about = await getAbout();
  const contact = await getContact();
  const imprint = await getImprint();

  return (
      <Main
        projects={projects}
        news={news}
        about={about[0]}
        contact={contact[0]}
        imprint={imprint[0]}
        slug={params.slug}
      />
  );
}

export const revalidate = 10;
