import { WebContainer } from "@webcontainer/api";

type TStatus = "Booting" | "Mounting" | "Installing" | "Starting" | "Running" | "Stopped";

export default defineStore("useWebContainerStore", () => {
  const wc = ref<WebContainer>();
  const wcUrl = ref<string>();
  const status = ref<TStatus>("Stopped");

  async function boot() {
    status.value = "Booting";
    wc.value = await WebContainer.boot();
    initWC(wc.value);
  }

  function initWC(wc: WebContainer) {
    wc.on("server-ready", (port, url) => {
      console.log("Server ready", port, url);
    });
  }

  return {
    wc,
    wcUrl,
    status,
    boot,
  };
});
