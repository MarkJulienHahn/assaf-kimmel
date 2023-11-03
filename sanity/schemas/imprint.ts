import { defineType } from "sanity";

export default defineType({
  name: "imprint",
  title: "Imprint",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      hidden: true,
    },
    {
      name: "imprint",
      title: "Imprint",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }, { title: 'H1', value: 'h1' }, { title: 'H2', value: 'h2' }],
          lists: [],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
          },
        },
      ],
    },
    {
      name: "privacy",
      title: "Privacy",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }, { title: 'H1', value: 'h1' }],
          lists: [],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
          },
        },
      ],
    },
  ],
});
