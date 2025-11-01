// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: "https://www.googleapis.com/books/v1",
      apiPageSize: 10,
    },
  },
  css: ["~/assets/css/main.css"],
  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./app/assets/icons",
      },
    ],
  },
  app: {
    head: {
      title: "Nuxt Books",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
