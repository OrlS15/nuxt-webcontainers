import type { FileSystemRoot, WCFile } from "#imports";
import { WebContainer, type FileSystemTree } from "@webcontainer/api";

type TStatus = "boot" | "mount" | "install" | "start" | "ready" | "stop";

export default defineStore("useWebContainerStore", () => {
  const wc = ref<WebContainer>();
  const wcUrl = ref<string>();
  const status = ref<TStatus>("stop");
  const terminals = ref();

  async function boot() {
    status.value = "boot";
    wc.value = await WebContainer.boot();
    initWC(wc.value);
  }

  function mount(fst: FileSystemTree) {
    if (!wc.value) throw new Error("WebContainer not booted");
    status.value = "mount";
    wc.value.mount(fst);
  }

  function writeFile(path: string, content: string) {
    if (!wc.value) throw new Error("WebContainer not booted");
    wc.value.fs.writeFile(path, content);
  }

  async function executeCommand(cmd: string, onData?: (d: string) => void) {
    const process = await wc.value?.spawn(cmd.split(" ")[0], cmd.slice(1).split(" "));
    process?.output.pipeTo(
      new WritableStream({
        write(chunk) {
          onData?.(chunk);
        },
      })
    );
    await process?.exit;
  }

  function initWC(wc: WebContainer) {
    wc.on("server-ready", (port, url) => {
      if (port === 3000) {
        wcUrl.value = url;
      }
    });
  }

  return {
    wc,
    wcUrl,
    status,
    boot,
    mount,
    executeCommand,
    writeFile,
  };
});
