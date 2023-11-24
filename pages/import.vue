<script setup lang="ts">
const fileSystem = ref(
  new WCDirectory("/pages", [
    new WCDirectory("/pages/test", [new WCFile("/pages/test/t", "content t.vue")]),
    new WCFile("/pages/index.vue", "content index.vue"),
    new WCFile("/pages/import.vue", "content import.vue"),
    new WCFile("/pages/wc.vue", "content wc.vue"),
  ])
) as Ref<InstanceType<typeof WCDirectory>>;
</script>

<template>
  <FileSystem :item="fileSystem" />
</template>
