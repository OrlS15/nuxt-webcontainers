import { WebContainer, type FileSystemTree } from "@webcontainer/api";

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

interface WCFileSystemElement {
  getFormatted(): FileSystemTree;
  get fullpath(): string;
  get name(): string;
}
export class WCFile implements WCFileSystemElement {
  constructor(private _fullpath: string, private _content: string) {}

  getFormatted(): FileSystemTree {
    return {
      [this.name]: {
        file: {
          contents: this._content,
        },
      },
    };
  }

  get fullpath() {
    return this._fullpath;
  }

  get name() {
    let pathSplitted = this._fullpath.split("/");
    return pathSplitted[pathSplitted.length - 1];
  }
}

export class WCDirectory implements WCFileSystemElement {
  constructor(private _fullpath: string, private _items: (WCDirectory | WCFile)[]) {}

  getFormatted(): FileSystemTree {
    return {
      [this.name]: {
        directory: this._items.reduce((acc, i) => {
          Object.assign(acc, i.getFormatted());
          return acc;
        }, {} as FileSystemTree),
      },
    };
  }

  addElement(elem: WCDirectory | WCFile) {
    this._items.push(elem);
  }

  get fullpath() {
    return this._fullpath;
  }

  get name() {
    let pathSplitted = this._fullpath.split("/");
    return pathSplitted[pathSplitted.length - 1];
  }

  get items() {
    return this._items;
  }
}
