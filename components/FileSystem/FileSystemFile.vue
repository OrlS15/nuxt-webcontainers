<script setup lang="ts">
import type { WCFile } from "#imports";

const props = defineProps<{
  file: WCFile;
}>();

const { selectedFile, lastSelectedFolder } = storeToRefs(useFileSystemStore());

const isThisFileSelected = computed(() => selectedFile.value === props.file);

function click() {
  selectedFile.value = props.file;
  lastSelectedFolder.value = undefined;
}
</script>

<template>
  <div class="cursor-pointer ml-[33px]" @click="click()">
    <span
      class="text-gray-500 flex items-center gap-2 min-w-max select-none"
      :class="{ 'text-gray-300': isThisFileSelected }"
    >
      <Icon name="ic:outline-insert-drive-file" size="18" class="" />
      <span>{{ $props.file.name }}</span>
    </span>
  </div>
</template>
