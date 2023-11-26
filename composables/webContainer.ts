import { WebContainer, type FileNode } from "@webcontainer/api";

let webContainer: WebContainer;

export async function useWebContainer() {
  if (!webContainer) webContainer = await WebContainer.boot();
  console.log("w");
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
    return await commandProcess.exit;
  }

  return { executeCommand };
}

export class WCFile {
  private _name: string;
  private _splittedDirs: string[];

  constructor(private _fullpath: string, private _content: string) {
    this._name = this._fullpath.split("/").pop()!;
    this._splittedDirs = this._fullpath.split("/").slice(0, -1);
  }

  toNode(): FileNode {
    return {
      file: {
        contents: this._content,
      },
    };
  }

  get fullpath() {
    return this._fullpath;
  }

  get splittedDirs() {
    return this._splittedDirs;
  }

  get name() {
    return this._name;
  }
}
