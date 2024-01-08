export default defineNuxtRouteMiddleware(async (to, from) => {
  // if executed on server, skip on client
  if (import.meta.client && to.fullPath === from.fullPath) {
    return;
  }

  try {
    const userStore = useAuthStore();
    const status = await $fetch("/api/github/status", {
      headers: useRequestHeaders(["cookie"]),
    });
    console.log(status)
    if (status === false) {
      userStore.isLoggedIn = false;
      return await navigateTo("/login");
    }
    userStore.isLoggedIn = true;
  } catch (err) {
    console.error(err);
  }
});
