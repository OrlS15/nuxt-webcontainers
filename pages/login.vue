<script setup lang="ts">
const { login } = useGithubAuth();

const { data: status } = await useFetch("/api/github/status", {
  headers: useRequestHeaders(["cookie"]),
});
if (status.value) {
  await navigateTo("/");
}
</script>

<template>
  <button type="button" @click="login">LOGIN WITH GITHUB</button>
</template>
