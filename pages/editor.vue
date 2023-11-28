<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const github_url = ref<string>("https://github.com/mattyx97/casa-felix");
const branch = ref<string>("master");

const { data: files, execute } = await useFetch("/api/github/repo-content", {
  query: {
    github_url: github_url.value,
    branch: branch.value,
  },
  transform: data => data.map(file => new WCFile(file.fullpath, file.content)),
  immediate: false,
});

watch(files, newFiles => {
  if (!newFiles) return;
  useFileSystemStore().createFileSystem(newFiles);
});

onMounted(() => {
  execute();
});
</script>

<template>
  <Splitpanes class="!h-screen">
    <Pane size="20" class="border-2 rounded-md h-full py-2">
      <TheFileSystem />
    </Pane>
    <Pane class="border rounded-md">
      <TheEditor />
    </Pane>
    <Pane class="border rounded-md p-2">WC</Pane>
  </Splitpanes>
</template>
