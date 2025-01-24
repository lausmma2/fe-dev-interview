// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@primevue/nuxt-module'],
  primevue: {},

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBasePath: 'https://interview-test.digital.cz',
    },
  },

  generate: {
    routes: ['/', '/users', '/login', '/salary'], // pre-generate static pages
  },

  typescript: {
    typeCheck: false, // set to 'true' if you know your Types
  },
});
