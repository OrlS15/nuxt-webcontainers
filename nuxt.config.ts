// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-icon"],
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
  /* shadcn-vue: https://www.shadcn-vue.com/docs/installation/nuxt.html */
  hooks: {
    "components:dirs": dirs => {
      dirs.unshift({
        path: "~/components/ui",
        // this is required else Nuxt will autoImport `.ts` file
        extensions: [".vue"],
        // prefix for your components, eg: UiButton
        prefix: "Ui",
        // prevent adding another prefix component by it's path.
        pathPrefix: false,
      });
    },
  },
});
