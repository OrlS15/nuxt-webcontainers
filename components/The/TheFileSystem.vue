<script setup lang="ts">
import type { WCFile } from "#imports";

const { fileSystem } = storeToRefs(useFileSystemStore());
</script>

<template>
  <div v-if="fileSystem" class="filesystem text-base">
    <template v-for="item in fileSystem.children">
      <template v-if="!(item instanceof FileSystemDir)">
        <FileSystemFile :file="(item as WCFile)" />
      </template>
      <template v-else>
        <FileSystemDirectory :dir="item" />
      </template>
    </template>
  </div>
</template>
