import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: '6w78k12w',
  dataset: "production",
  apiVersion: "2023-10-23",
});

export async function getNews() {
  return client.fetch(
    groq`*[_type == "news"]|order(orderRank){"images": images[]{alt, "asset": asset->{...}}, text, headline, title, slug}`
  );
}

export async function getInfo() {
  return client.fetch(
    groq`*[_type == "info"]{"image": image{alt, "asset": asset->{...}}, text}`
  );
}