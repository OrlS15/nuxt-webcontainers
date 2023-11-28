import AdmZip from "adm-zip";
import { z } from "zod";

const querySchema = z.object({
  github_url: z.string().url(),
  branch: z.string(),
});

export default defineGithubAuthEventHandler(async (event, gh_token) => {
  const query = await getValidatedQuery(event, querySchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: query.error.message,
    });
  }
  const { github_url, branch } = query.data;

  const { username, repo } = getInfoFromGithubUrl(github_url);

  const data = await fetch(`https://api.github.com/repos/${username}/${repo}/zipball/${branch}`, {
    headers: {
      Authorization: `token ${gh_token}`,
    },
  }).then(res => res.blob());

  const zip = new AdmZip(Buffer.from(await data.arrayBuffer()));
  const zipEntries = zip
    .getEntries()
    .filter(e => !e.isDirectory && !filteredFiles.some(s => e.entryName.includes(s)));

  return zipEntries.map(e => ({
    fullpath: e.entryName.split("/").slice(1).join("/"),
    name: e.name,
    content: e.getData().toString("utf8"),
  }));
});

const filteredFiles = [
/*   "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "pnpm-lock.json",
  "bun.lockb", */
  ".vscode",
  ".github",
];

// get username and repo name from github url
function getInfoFromGithubUrl(github_url: string) {
  const [username, repo] = github_url.replace(/https:\/\/github.com\//, "").split("/");
  return { username, repo };
}
