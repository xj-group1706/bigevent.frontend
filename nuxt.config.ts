import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  routeRules: {},
  devtools: {
    enabled: true,
  },
  // typescript: {
  //   strict: true,
  //   typeCheck: true,
  // },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "bigEVENT",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [
        { src: "https://www.paypal.com/sdk/js?client-id=test&currency=USD" },
        { src: "https://checkout.stripe.com/checkout.js" },
      ],
    },
  },

  imports: {
    autoImport: true,
    dirs: ["composables"],
  },

  css: ["@/assets/scss/app.scss", "@/assets/css/tailwind.css"],
  ssr: true,

  modules: [
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@nuxt/image-edge",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    // 'vue-toastification/nuxt',
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "pinia-plugin-persistedstate/nuxt",
  ],

  image: {
    domains: ["http://localhost:1337"],
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en.json",
      },
      {
        code: "ru",
        language: "ru-RU",
        name: "Русский язык",
        file: "ru.json",
      },
      {
        code: "uz",
        language: "uz-UZ",
        name: "O'zbek tili",
        file: "uz.json",
      },
    ],
    lazy: true,
    langDir: "locales/",
    vuei18n: {
      fallbackLocale: "en",
    },
  },

  pluginsIgnore: [/^ignored-plugin/, /another-ignored-plugin/],

  plugins: [
    // {src: '~/node_modules/bootstrap/dist/js/bootstrap.js', mode: 'client'}
    // { src: "./plugins/useBootstrap.client.ts", mode: "client" },
    { src: "./plugins/showToast.client.js", mode: "client" },
    { src: "./plugins/vue-the-mask.ts", mode: "client" },
    // { src: './plugins/paypal.client.js' }
    // { src: 'https://checkout.stripe.com/checkout.js'}
  ],

  build: {
    transpile: ["bootstrap"],
    // loaders: {
    //   scss: {
    //     implementation: require("sass"),
    //   },
    // },
  },

  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },

  typescript: {
    shim: false,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VITE_API_URL || "http://localhost:1337/api",
      imageUrl: process.env.VITE_IMAGE_URL || "http://localhost:1337",
    },
  },

  compatibilityDate: "2024-07-25",
});
