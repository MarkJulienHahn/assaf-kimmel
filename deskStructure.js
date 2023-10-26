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
      .title('Info')
      .id('info')
      .child(S.document().schemaType('info').documentId('info')),

      S.divider(),
    ]);
