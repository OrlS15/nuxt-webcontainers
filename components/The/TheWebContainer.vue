<script setup lang="ts">
const wcs = useWebContainerStore();

const iframeRef = ref<HTMLIFrameElement | null>(null);

function refresh() {
  if (iframeRef.value && wcs.wcUrl) {
    iframeRef.value.src = wcs.wcUrl;
  }
}
</script>

<template>
  <div class="w-full h-full">
    <!-- "header" -->
    <div class="border-y px-2 py-1.5 flex items-center justify-between gap-2">
      <Icon name="material-symbols:lock-outline" size="18" class="text-white w-[10%]" />
      <span class="text-gray-500 truncate block whitespace-nowrap">{{ wcs.wcUrl }}</span>
      <Icon
        name="ic:round-refresh"
        size="22"
        class="text-white cursor-pointer w-[10%]"
        @click="refresh()"
      />
    </div>
    <!-- iframe -->
    <iframe v-if="wcs.status == 'ready'" ref="iframeRef" :src="wcs.wcUrl" class="w-full h-full" />
    <!-- loaders -->
    <div v-else class="flex items-center justify-center h-full gap-2">
      <Icon name="svg-spinners:270-ring" size="22" />
      <span>{{ wcs.status[0].toUpperCase() + wcs.status.slice(1) }}ing...</span>
    </div>
  </div>
</template>
