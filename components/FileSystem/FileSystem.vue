<script setup lang="ts">
const props = defineProps<{
  root: FileSystemRoot;
}>();

const isDirOpen = ref<{ [key: string]: boolean }>({});
function toggle(k: string) {
  isDirOpen.value[k] = !isDirOpen.value[k];
}

const orderedFileSystemRoot = computed(() => {
  // order by type and name
  return Object.entries(props.root).sort((a, b) => {
    if (a[1] instanceof WCFile && b[1] instanceof WCFile) {
      return a[0].localeCompare(b[0]);
    }
    if (a[1] instanceof WCFile) {
      return 1;
    }
    if (b[1] instanceof WCFile) {
      return -1;
    }
    return a[0].localeCompare(b[0]);
  });
});
</script>

<template>
  <div>
    <template v-for="[k, f] in orderedFileSystemRoot" :key="f">
      <div v-if="!(f instanceof WCFile)">
        <span class="cursor-pointer border-2" @click="toggle(k)">{{ k }}</span>
        <div v-if="isDirOpen[k]" class="ml-4">
          <FileSystem :root="f.directory" />
        </div>
      </div>
      <FileSystemFile v-else :file="f" />
    </template>
  </div>
</template>
