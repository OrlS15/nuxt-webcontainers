import { WebContainer } from "@webcontainer/api";

let webContainer: WebContainer;

export async function useWebContainer() {
  if (!webContainer) webContainer = await WebContainer.boot();
  return webContainer;
}

export function useWebContainerUtils(wc: WebContainer) {
  async function executeCommand(command: string, output?: (message: string) => void) {
    const commandParts = command.split(" ");

    const commandProcess = await wc.spawn(commandParts[0], commandParts.slice(1), {
      output: output ? true : false,
    });

    commandProcess.output.pipeTo(
      new WritableStream({
        write(chunk) {
          output?.(chunk);
        },
      })
    );
    return commandProcess;
  }

  return { executeCommand };
}
