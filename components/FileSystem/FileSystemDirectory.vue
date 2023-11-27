<script setup lang="ts">
const props = defineProps<{
  dir: InstanceType<typeof FileSystemDir>;
}>();

const [isDirOpen, toggle] = useToggle();
</script>

<template>
  <div class="w-min my-2 text-sm">
    <!-- dir -->

    <!-- button -->
    <UiButton
      class="flex items-center gap-1 px-3 !py-1 h-min"
      @click="toggle()"
    >
      <Icon
        name="material-symbols:arrow-forward-ios-rounded"
        size="18"
        class="text-gray-600"
        :class="{ 'rotate-90': isDirOpen }"
      />
      <Icon name="ic:baseline-folder" size="18" class="text-white" />
      <span>{{ dir.name }}</span>
    </UiButton>
    <!-- childrens -->
    <template v-if="isDirOpen">
      <div v-for="item in props.dir.children" class="ml-4">
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
