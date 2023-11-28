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
  <div class="w-full h-screen flex items-center justify-center flex-col gap-2">
    <UiButton type="button" @click="login" class="">
      LOGIN WITH GITHUB
    </UiButton>
    <!-- explain that we need his github account because of apis limits and access to his repos -->
    <p class="text-sm text-gray-500 max-w-[400px] text-center">
      We need your github account to access your repositories and to use the github APIs.
    </p>
  </div>
</template>
