<script setup lang="ts">
definePageMeta({
  middleware: "safe-github-auth",
});

const authStore = useAuthStore();

const { data: repos } = await useFetch("/api/github/repos", {
  headers: useRequestHeaders(["cookie"]),
});

const public_url = ref("");
const private_url = ref("");
const branch = ref("");
const install_command = ref("npm install");
const run_command = ref("npm run dev");

const validations_steps = computed(() => [
  public_url.value || private_url.value,
  branch.value && install_command.value && run_command.value,
]);

watch(public_url, (new_public_url) => {
  if (!new_public_url) return;
  private_url.value = "";
});
watch(private_url, (new_private_url) => {
  if (!new_private_url) return;
  public_url.value = "";
});

async function goToEditor() {
  const editorStore = useEditorStore();
  editorStore.states = {
    github_branch: branch.value,
    github_url: public_url.value || private_url.value,
    installCommand: install_command.value,
    startCommand: run_command.value,
  };
  await navigateTo("/editor");
}
</script>

<template>
  <div
    class="w-full h-screen flex items-center justify-center flex-col gap-2 max-w-[450px] mx-auto"
  >
    <!-- first section -->
    <div
      class="border rounded-md relative p-4 flex items-center justify-center flex-col gap-2 w-full"
      :class="{ 'border-primary': validations_steps[0] }"
    >
      <!-- first input (public repo only) -->
      <UiLabel class="text-md text-start font-normal w-full">
        Enter the URL of a public Github repository to get started.
        <UiInput
          v-model="public_url"
          placeholder="https://github.com/..."
          class="placeholder:text-gray-600 my-1"
        />
      </UiLabel>

      <!-- divider -->
      <div class="flex justify-center items-center w-full gap-4">
        <UiSeparator class="flex-1" />
        <span>OR</span>
        <UiSeparator class="flex-1" />
      </div>

      <!-- second input (login and use private repo) -->
      <!-- if loggedin -->
      <template v-if="authStore.isLoggedIn">
        <UiLabel class="text-md font-normal text-start w-full">
          <span class="text-gray-500">Select a private Github repository to get started.</span>
          <UiSelect v-model="private_url" class="w-full">
            <UiSelectTrigger>
              <UiSelectValue placeholder="Select a repository" />
            </UiSelectTrigger>
            <UiSelectContent class="h-[180px]">
              <UiSelectItem v-for="repo in repos" :key="repo" :value="repo">
                {{ repo }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </UiLabel>
      </template>
      <!-- if NOT loggedin -->
      <template v-else>
        <p class="text-md text-center">Login to Github to use private repositories.</p>
        <NuxtLink
          to="/login"
          class="text-primary cursor-pointer hover:underline underline-offset-8"
        >
          LOGIN WITH GITHUB
        </NuxtLink>
      </template>
      <!--  -->
    </div>
    <!-- second section -->
    <div
      :class="{ 'border-primary': validations_steps[1] }"
      class="border rounded-md p-4 flex items-center justify-center flex-col gap-2 w-full"
    >
      <UiLabel class="text-md font-normal text-start w-full">
        <span class="text-gray-500">Branch</span>
        <UiInput v-model="branch" placeholder="master" class="placeholder:text-gray-600 my-1" />
      </UiLabel>
      <UiLabel class="text-md font-normal text-start w-full">
        <span class="text-gray-500">Install command</span>
        <UiInput
          v-model="install_command"
          placeholder="npm install"
          class="placeholder:text-gray-600 my-1"
        />
      </UiLabel>
      <UiLabel class="text-md font-normal text-start w-full">
        <span class="text-gray-500">Run command</span>
        <UiInput
          v-model="run_command"
          placeholder="npm run dev"
          class="placeholder:text-gray-600 my-1"
        />
      </UiLabel>
    </div>
    <!-- third section -->
    <div class="border rounded-md p-4 flex items-center justify-center flex-col gap-2 w-full">
      <UiButton :disabled="!validations_steps.every(Boolean)" class="w-full" @click="goToEditor()">
        GO TO EDITOR
      </UiButton>
    </div>
  </div>
</template>
