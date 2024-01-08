export default defineStore("useEditorStore", () => {
  const states = reactive({
    github_url: "",
    github_branch: "",
    installCommand: "",
    startCommand: "",
  });

  return { states };
});
