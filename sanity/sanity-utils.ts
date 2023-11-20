import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: '6w78k12w',
  dataset: "production",
  apiVersion: "2023-10-23",
});

export default client;

export async function getNews() {
  return client.fetch(
    groq`*[_type == "news"]|order(orderRank){"images": images[]{alt, "asset": asset->{...}}, text, headline, title, slug, date, "project": project->{...}}`
  );
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "projects"]|order(orderRank){"images": images[]{alt, "asset": asset->{...}
  }, shortDescription, twoLineDescription, description, title, credits, slug}`
  );
}

export async function getAbout() {
  return client.fetch(
    groq`*[_type == "about"]{"image": image{alt, "asset": asset->{...}
  }, text, loadingText}`
  );
}
export async function getContact() {
  return client.fetch(
    groq`*[_type == "contact"]{...}`
  );
}

export async function getImprint() {
  return client.fetch(
    groq`*[_type == "imprint"]{...}`
  );
}