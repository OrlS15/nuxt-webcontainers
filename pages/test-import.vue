<script setup lang="ts">
const result = ref();

async function importa() {
  let res = import.meta.glob("../composables/*", {});
  for (const path in res) {
    let r = await res[path]();
    console.log(r);
  }
}
</script>

<template>
  <button @click="importa()">IMPORTA</button>
  <pre>{{ result }}</pre>
</template>
