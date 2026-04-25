import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.TINA_BRANCH || "master",
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "",
  },

  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              const date = new Date().toISOString().split("T")[0];
              const slug = (values?.title || "sin-titulo")
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
              return `${date}-${slug}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
            options: ["post", "page"],
          },
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Autor",
          },
          {
            type: "boolean",
            name: "comments",
            label: "Comentarios habilitados",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenido",
            isBody: true,
          },
        ],
      },
      {
        name: "page",
        label: "Páginas",
        path: "",
        format: "md",
        match: {
          include: "{about,index}",
        },
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
            options: ["page", "home"],
          },
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "permalink",
            label: "Permalink",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenido",
            isBody: true,
          },
        ],
      },
    ],
  },
});
