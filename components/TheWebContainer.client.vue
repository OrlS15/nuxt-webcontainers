<script setup lang="ts">
const resultValue = ref("");
const inputValue = ref("");

//
const webcontainer = await useWebContainer();
const { executeCommand } = useWebContainerUtils(webcontainer);

webcontainer.on("server-ready", (port, url) => console.log(port, url));
webcontainer.mount({
  "package.json": {
    file: {
      contents: `
        {
          "private": true,
          "scripts": {
            "dev": "nuxt dev"
          },
          "devDependencies": {
            "nuxt": "latest"
          }
        }
      `,
    },
  },
});

async function execute() {
  const commandProcess = await executeCommand(inputValue.value, data => {
    resultValue.value = data;
  });
}
</script>

<template>
  <form @submit.prevent="execute">
    <input type="text" v-model="inputValue" class="border p-1.5 rounded-l-md" />
    <button type="submit" class="border p-1.5 rounded-r-md">Send</button>
  </form>
  <pre>{{ resultValue }}</pre>
</template>
