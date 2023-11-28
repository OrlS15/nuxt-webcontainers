<script setup lang="ts">
const textAreaVal = ref<string>("");

const { selectedFile } = storeToRefs(useFileSystemStore());

watchEffect(() => {
  textAreaVal.value = selectedFile.value?.content ?? "";
});
</script>

<template>
  <div class="h-screen">
    <textarea
      v-if="selectedFile"
      v-model="textAreaVal"
      class="outline-none p-2 bg-gray-900 h-full w-full"
    />
    <div v-else class="bg-gray-900 h-full">
      <div class="flex flex-col justify-center items-center h-full">
        <div class="text-4xl text-gray-400">No file selected</div>
        <div class="text-gray-400">Select a file from the file system</div>
      </div>
    </div>
  </div>
</template>
