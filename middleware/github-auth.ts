export default defineNuxtRouteMiddleware(async (to, from) => {
  // if executed on server, skip on client
  if (import.meta.client && to.fullPath === from.fullPath) {
    return;
  }

  try {
    const status = await $fetch("/api/github/status", {
      headers: useRequestHeaders(["cookie"]),
    });
    if (status === false) {
      return await navigateTo("/login");
    }
  } catch (err) {
    console.error(err);
  }
});
