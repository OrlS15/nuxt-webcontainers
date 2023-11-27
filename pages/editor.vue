<script setup lang="ts">
const github_url = ref<string>("https://github.com/nuxt/learn.nuxt.com/");
const branch = ref<string>("main");

const { data: files, execute } = await useFetch("/api/github/repo-content", {
  query: {
    github_url: github_url.value,
    branch: branch.value,
  },
  transform: data => data.map(file => new WCFile(file.fullpath, file.content)),
  immediate: false,
});

const fileSystem = computed(() => {
  const fs = new FileSystemRoot();
  files.value?.forEach(f => {
    fs.addFile(f);
  });
  return fs;
});
</script>

<template>
    <button type="button" @click="execute()">EXECUTE</button>
    <FileSystem :root="fileSystem" />
</template>
