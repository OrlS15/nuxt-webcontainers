<script setup lang="ts">
import { FileSystemRoot, WCFile } from "#imports";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const editorStore = useEditorStore();

const fss = useFileSystemStore();
const wcs = useWebContainerStore();

const { data: files, execute } = await useFetch("/api/github/repo-content", {
  query: {
    github_url: editorStore.states.github_url,
    branch: editorStore.states.github_branch,
  },
  transform: data => data.map(file => new WCFile(file.fullpath, file.content)),
  server: false,
});

onMounted(async () => {
  let bootingPromise = wcs.boot();
  watchOnce(files, async newFiles => {
    if (!newFiles) return;
    fss.createFileSystem(newFiles);
    await bootingPromise;
    // mount
    wcs.mount(fss.fileSystem?.toNode()!);

    // install
    wcs.status = "install";
    await wcs.executeCommand(editorStore.states.installCommand);

    // start
    wcs.status = "start";
    await wcs.executeCommand(editorStore.states.startCommand);

    // ready
    wcs.status = "ready";
  });
});
</script>

<template>
  <Splitpanes class="!h-screen">
    <Pane size="20" class="border-2 h-full py-2">
      <TheFileSystem />
    </Pane>
    <Pane class="border">
      <TheEditor />
    </Pane>
    <Pane class="border">
      <TheWebContainer />
    </Pane>
  </Splitpanes>
</template>
