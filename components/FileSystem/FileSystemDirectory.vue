<script setup lang="ts">
import type { FileSystemDir } from "#imports";

const props = defineProps<{
  dir: FileSystemDir;
}>();

const fileSystemStore = useFileSystemStore();

const { lastSelectedFolder } = storeToRefs(fileSystemStore);

const isDirOpen = ref<boolean>(false);
const isThisFolderSelected = computed(() => lastSelectedFolder.value === props.dir);

function toggle() {
  lastSelectedFolder.value = props.dir;
  isDirOpen.value = !isDirOpen.value;
}
function createNewFile() {
  fileSystemStore.addFile(new WCFile(props.dir.fullpath + "/new-file.txt", ""));
}
function createNewDir() {
  fileSystemStore.createDir(props.dir.fullpath + "/new-dir");
}
</script>

<template>
  <div class="w-[calc(100%-20px)] ml-4">
    <!-- button -->
    <button
      class="flex w-full items-center gap-1 group px-1 select-none"
      :class="{ '!bg-gray-800 rounded-sm': isThisFolderSelected }"
      @click="toggle()"
    >
      <!-- arrow icon -->
      <Icon
        name="material-symbols:arrow-forward-ios-rounded"
        size="14"
        class="text-gray-600"
        :class="{ 'rotate-90': isDirOpen }"
      />
      <!-- folder icon -->
      <Icon name="ic:baseline-folder" size="14" class="text-primary" />
      <span>{{ dir.name }}</span>
      <!-- create file and folder icons -->
      <span class="hidden ml-auto group-hover:flex items-center justify-center">
        <Icon
          name="ph:file-plus"
          size="20"
          class="text-gray-400 hover:bg-gray-500 hover:text-white rounded-sm p-[2px]"
          @click.stop="createNewFile()"
        />
        <Icon
          name="material-symbols:create-new-folder-outline-rounded"
          size="20"
          class="text-gray-400 hover:bg-gray-500 hover:text-white rounded-sm p-[2px]"
          @click.stop="createNewDir()"
        />
      </span>
    </button>
    <!-- childrens -->
    <template v-if="isDirOpen">
      <div v-for="item in props.dir.children" class="">
        <template v-if="!(item instanceof FileSystemDir)">
          <FileSystemFile :file="item" />
        </template>
        <template v-else>
          <FileSystemDirectory :dir="item" />
        </template>
      </div>
    </template>
  </div>
</template>
