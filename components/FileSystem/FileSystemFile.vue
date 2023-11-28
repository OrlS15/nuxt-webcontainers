<script setup lang="ts">
import type { WCFile } from '#imports';

defineProps<{
  file: WCFile;
}>();

const { selectedFile } = storeToRefs(useFileSystemStore());
</script>

<template>
  <div class="cursor-pointer ml-[33px]" @click="selectedFile = file">
    <span class="text-gray-500 flex items-center gap-2 min-w-max">
      <Icon name="ic:outline-insert-drive-file" size="18" class="" />
      <span>{{ $props.file.name }}</span>
    </span>
  </div>
</template>
