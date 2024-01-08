export default defineStore("useAuthStore", () => {
  const isLoggedIn = ref(false);

  return { isLoggedIn };
});
