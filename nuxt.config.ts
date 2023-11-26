// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      GITHUB_CLIENT_ID: "",
      GITHUB_LOGIN_URL: `https://github.com/login/oauth/authorize?client_id=${process.env.NUXT_PUBLIC_GITHUB_CLIENT_ID}`,
    },
    GITHUB_CLIENT_SECRET: "",
  },
  nitro: {
    routeRules: {
      "**": {
        headers: {
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-origin",
        },
      },
    },
  },
});
