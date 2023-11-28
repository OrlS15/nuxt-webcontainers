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
    <iframe ref="iframeRef" :src="wcs.wcUrl" class="w-full h-full" />
  </div>
</template>
