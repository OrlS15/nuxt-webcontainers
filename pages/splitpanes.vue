<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
</script>

<template>
  <Splitpanes class="!w-full !h-screen">
    <Pane min-size="10">1</Pane>
    <Pane>
      <Splitpanes horizontal class="w-full relative">
        <Pane min-size="10" class="border">2</Pane>
        <Pane min-size="10" class="border">3</Pane>
        <Pane min-size="10" class="border">4</Pane>
      </Splitpanes>
    </Pane>
    <Pane min-size="10">5</Pane>
  </Splitpanes>
</template>

<style>
.splitpanes--horizontal > .splitpanes__splitter {
  @apply relative my-[-8px] h-[16px];
}
.splitpanes--vertical > .splitpanes__splitter {
  @apply relative mx-[-8px] w-[16px];
}
.splitpanes--horizontal > .splitpanes__splitter,
.splitpanes--vertical > .splitpanes__splitter {
  @apply hover:bg-[#8882];
}
.splitpanes--vertical .splitpanes__pane,
.splitpanes--horizontal .splitpanes__pane {
  transition: none;
}
</style>
