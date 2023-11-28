export default defineStore("useEditorStore", () => {
  const states = reactive({
    github_url: "https://github.com/mattyx97/gestionale-salone",
    github_branch: "master",
    installCommand: "pnpm install",
    startCommand: "pnpm run dev",
  });

  return { states };
});
