<script setup lang="ts">
defineProps<{
  file: InstanceType<typeof WCFile>;
}>();
</script>

<template>
  <div class="cursor-pointer">
    <span class="text-gray-400"></span>
    <span class="text-gray-600">{{ $props.file.name }}</span>
  </div>
</template>
