function login() {
  const { GITHUB_LOGIN_URL } = useRuntimeConfig().public;
  window.location.replace(GITHUB_LOGIN_URL);
}

export function useGithubAuth() {
  return { login };
}
