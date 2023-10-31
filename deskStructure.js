import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const myStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "news",
        title: "News",
        S,
        context,
      }),
      S.listItem()
        .title("Info")
        .id("info")
        .child(S.document().schemaType("info").documentId("info")),

      S.divider(),
      orderableDocumentListDeskItem({
        type: "projects",
        title: "Projects",
        S,
        context,
      }),
      S.listItem()
        .title("About")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
    ]);
