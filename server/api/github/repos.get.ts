export default defineGithubAuthEventHandler(async (event, gh_token) => {
  /* get all user repos */
  const repos = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `token ${gh_token}`,
    },
  }).then((res) => res.json());

  return repos.map((repo: any) => repo.html_url) as string[];
});
