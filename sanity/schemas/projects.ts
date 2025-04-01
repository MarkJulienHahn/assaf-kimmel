import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "projects",
  title: "projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required().warning('Every Project needs a Title.')
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: Rule => Rule.required().warning('A unique slug is required. Please just click "generate" and it gets generated automatically from the title.')
    },

    {
      name: "twoLineDescription",
      title: "Two Line Description",
      type: "array",
      of: [{
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: {
          decorators: [{ title: "Emphasis", value: "em" }],
        },
      }],
      description: "A sentence of maximum 67 characters will be a two-line description."
    },

    {
      name: "shortDescription",
      title: "Short Description",
      type: "array",
      of: [{
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: {
          decorators: [{ title: "Emphasis", value: "em" }],
        },
      }],
      validation: Rule => Rule.required().warning("Please enter a short description of a maximum of 400 characters")

    },

    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: {
          decorators: [{ title: "Emphasis", value: "em" }],
        },
      }],
    },

    {
      name: "credits",
      title: "Credits",
      type: "array",
      of: [{ name: "infos", title: "Infos", type: "object", fields: [{ name: "job", title: "Job", type: "string" }, { name: "name", title: "Name", type: "string" }] }]
    },

    { name: "video", title: "Video", type: "object", description: "Copy the embed link of the vimeo video – it should have this structure: https://player.vimeo.com/video/1071192095. As soon as this field is filled the image slider will be hidden and only the video is visible", fields: [{ name: "url", type: "string" }] },


    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          name: "image",
          type: "image",
          fields: [
            { name: "alt", title: "Alt", type: "string" }],

        },
      ]
    },


    orderRankField({ type: "news" }),
  ],
});
