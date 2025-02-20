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
    // dirs: ["composables"],
  },

  css: ["@/assets/scss/app.scss", "@/assets/css/tailwind.css"],
  ssr: true,

  modules: [
    // "@sidebase/nuxt-auth",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@nuxt/image-edge",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "pinia-plugin-persistedstate/nuxt",
  ],

  // auth: {
  //   isEnabled: true,
  //   disableServerSideAuth: false,
  //   origin: "http://localhost:3000/", // Replace with your app's origin
  //   provider: {
  //     type: "local", // Use 'local' for custom backend or other providers like 'auth0'
  //     endpoints: {
  //       signIn: {
  //         path: `${process.env.VITE_API_URL}/auth/local`,
  //         method: "post",
  //       },
  //       signOut: { path: "/api/auth/logout", method: "post" },
  //       getSession: false,
  //     },
  //     token: {
  //       signInResponseTokenPointer: "/jwt", // Path to the token in the login response
  //       type: "Bearer", // Token type
  //     },
  //     pages: {
  //       login: "/account/login",
  //     },
  //   },
  //   globalAppMiddleware: true, // Enable global middleware
  //   session: {
  //     strategy: "jwt",
  //     storage: "cookie",
  //   },
  // },

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
    { src: "./plugins/showToast.client.js", mode: "client" },
    { src: "./plugins/vue-the-mask.ts", mode: "client" },
  ],

  build: {
    transpile: ["bootstrap"],
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
