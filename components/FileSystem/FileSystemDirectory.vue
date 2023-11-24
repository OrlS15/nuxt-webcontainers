<script setup lang="ts">
defineProps<{
  directory: InstanceType<typeof WCDirectory>;
}>();
</script>

<template>
  <div class="border-l-2 border-red-500 pl-2">
    <div class="cursor-pointer">
      <span class="text-gray-400">&gt; </span>
      <span class="text-gray-600">{{ $props.directory.name }}</span>
    </div>
    <div class="flex flex-col ml-1">
      <template v-for="item in $props.directory.items" :key="item.fullpath">
        <FileSystemDirectory v-if="!(item instanceof WCFile)" :directory="item" />
        <FileSystemFile v-else :file="item" />
      </template>
    </div>
  </div>
</template>
