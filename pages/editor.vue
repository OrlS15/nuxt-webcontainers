<script setup lang="ts">
const github_url = ref<string>("https://github.com/nuxt/learn.nuxt.com/");
const branch = ref<string>("main");

const { data: files, execute } = useFetch("/api/github/repo-content", {
  query: {
    github_url: github_url.value,
    branch: branch.value,
  },
  transform: data => data.map(file => new WCFile(file.fullpath, file.content)),
  immediate: false,
});


const fileSystem = computed<FileSystemRoot>(() => {
  if (!files.value) return {};
  const root: FileSystemRoot = {};
  files.value.forEach(file => {
    const path = file.fullpath.split("/");
    let current = root;
    path.forEach((p, i) => {
      if (i === path.length - 1) {
        current[p] = file;
      } else {
        if (!current[p]) {
          current[p] = {
            directory: {},
          };
        }
        // @ts-ignore
        current = current[p].directory;
      }
    });
  });
  return root;
});
</script>

<template>
  <button type="button" @click="execute()">EXECUTE</button>
  <FileSystem v-if="files" :root="fileSystem" />
</template>
