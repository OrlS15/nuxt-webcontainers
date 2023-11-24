<script setup lang="ts">
defineProps<{
  item: InstanceType<typeof WCFile> | InstanceType<typeof WCDirectory>;
}>();
</script>

<template>
  <FileSystemDirectory v-if="!(item instanceof WCFile)" :directory="item" />
  <FileSystemFile v-else :file="item" />
</template>
