<script setup lang="ts">
import type { FileSystemDir } from "#imports";

const props = defineProps<{
  dir: FileSystemDir;
}>();

const [isDirOpen, toggle] = useToggle();
</script>

<template>
  <div class="w-full ml-4 min-w-max">
    <!-- button -->
    <button class="flex w-full items-center gap-1 group" @click="toggle()">
      <Icon
        name="material-symbols:arrow-forward-ios-rounded"
        size="14"
        class="text-gray-600"
        :class="{ 'rotate-90': isDirOpen }"
      />
      <Icon name="ic:baseline-folder" size="14" class="text-primary" />
      <span>{{ dir.name }}</span>
      <!-- create file and folder icons -->
      <span class="hidden ml-auto mr-8 group-hover:block">
        <Icon
          name="ph:file-plus"
          size="20"
          class="text-gray-400 hover:bg-gray-500 hover:text-white rounded-sm p-[2px]"
        />
        <Icon
          name="material-symbols:create-new-folder-outline-rounded"
          size="20"
          class="text-gray-400 hover:bg-gray-500 hover:text-white rounded-sm p-[2px]"
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
