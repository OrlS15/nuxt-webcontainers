<script setup lang="ts">
const props = defineProps<{
  root: InstanceType<typeof FileSystemRoot>;
}>();
</script>

<template>
  <div class="filesystem">
    <template v-for="item in props.root.children">
      <template v-if="!(item instanceof FileSystemDir)">
        <FileSystemFile :file="item" />
      </template>
      <template v-else>
        <FileSystemDirectory :dir="item" />
      </template>
    </template>
  </div>
</template>
