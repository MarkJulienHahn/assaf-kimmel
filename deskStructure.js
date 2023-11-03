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

      S.listItem()
        .title("Contact")
        .id("contact")
        .child(S.document().schemaType("contact").documentId("contact")),

      S.divider(),

      S.listItem()
        .title("Imprint")
        .id("imprint")
        .child(S.document().schemaType("imprint").documentId("imprint")),
    ]);
