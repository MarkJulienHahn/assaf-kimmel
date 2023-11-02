import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [

    { name: "title", title: "Title", type: "string", },

    {
      name: "contact", title: "Contact",
      type: "object", fields: [{ name: "mail", title: "Mail", type: "string" }, { name: "phone", title: "Phone", type: "string" }, { name: "addressLine1", title: "Address Line 1", type: "string" }, { name: "addressLine2", title: "Address Line 2", type: "string" }]
    },

    {
      name: "links", title: "Links", type: "array", of: [{ name: "link", type: "object", fields: [{ name: "link", title: "Link", type: "url" }, { name: "name", title: "Name", type: "string" }] }]
    },

  ],
});
