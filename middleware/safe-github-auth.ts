export default defineNuxtRouteMiddleware(async (to, from) => {
  // if executed on server, skip on client
  if (import.meta.client && to.fullPath === from.fullPath) {
    return;
  }
  useAuthStore().isLoggedIn = await $fetch("/api/github/status", {
    headers: useRequestHeaders(["cookie"]),
  });
});
