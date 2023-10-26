import { defineField, defineType } from "sanity";

export default defineType({
  name: "info",
  title: "Info",
  type: "document",
  fields: [

    { name: "title", title: "Title", type: "string", hidden: true },

    {
      name: "text",
      title: "Text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
          },
        },
      ],
    },

    {
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },

    {
      name: "contact", title: "Contact",
      type: "object", fields: [{ name: "mail", title: "Mail", type: "string" }, { name: "phone", title: "Phone", type: "string" }, { name: "adressLine1", title: "Adress Line 1", type: "string" }, { name: "adressLine2", title: "Adress Line 2", type: "string" }]
    },

    {
      name: "links", title: "Links", type: "array", of: [{ name: "link", type: "object", fields: [{ name: "link", title: "Link", type: "url" }, { name: "name", title: "Name", type: "string" }] }]
    },

  ],
});
