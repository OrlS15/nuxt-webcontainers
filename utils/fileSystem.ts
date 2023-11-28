import type { FileSystemTree } from "@webcontainer/api";

export class FileSystemRoot {
  private _children: (FileSystemDir | WCFile)[];
  constructor() {
    this._children = [];
  }
  get children() {
    return this._children;
  }
  addFile(file: WCFile) {
    // add file to the root (create dirs if needed)
    const pathArr = file.path.split("/").filter(Boolean);
    pathArr.pop(); // remove file name
    let currentDir: FileSystemDir | undefined;

    // if pathArr is empty add file to root
    if (pathArr.length === 0) {
      // add file to root
      this._children.push(file);
      return;
    }

    // use findDir to find the dir where to add the file, if it doesn't exist create it with createDir
    pathArr.forEach((dirName, index) => {
      if (index === 0) {
        let childDir = this._children.find(dir => dir.name === dirName) as FileSystemDir;
        if (!childDir) {
          childDir = new FileSystemDir(dirName);
          this._children.push(childDir);
          this.orderChildren();
        }
        currentDir = childDir;
      } else {
        let childDir = currentDir?.children.find(dir => dir.name === dirName) as FileSystemDir;
        if (!childDir) {
          childDir = new FileSystemDir(dirName);
          currentDir?.addChildren(childDir);
        }
        currentDir = childDir;
      }
    });
    currentDir?.addChildren(file);
    currentDir?.orderChildren();
  }
  findDir(path: string): FileSystemDir | undefined {
    // path example: pages/test
    const pathArr = path.split("/").filter(Boolean);
    let currentDir: FileSystemDir | undefined;
    pathArr.forEach((dirName, index) => {
      if (index === 0) {
        currentDir = this._children.find(dir => dir.name === dirName) as FileSystemDir;
      } else {
        currentDir = currentDir?.children.find(dir => dir.name === dirName) as FileSystemDir;
      }
    });
    return currentDir;
  }
  createDir(path: string) {
    // path example: pages/test
    // create dir at path (create dirs if needed)
    const pathArr = path.split("/").filter(Boolean);
    let currentDir: FileSystemDir | undefined;

    pathArr.forEach((dirName, index) => {
      if (index === 0) {
        let childDir = this._children.find(dir => dir.name === dirName) as FileSystemDir;
        if (!childDir) {
          childDir = new FileSystemDir(dirName);
          this._children.push(childDir);
        }
        currentDir = childDir;
      } else {
        let childDir = currentDir?.children.find(dir => dir.name === dirName) as FileSystemDir;
        if (!childDir) {
          childDir = new FileSystemDir(dirName);
          currentDir?.addChildren(childDir);
        }
        currentDir = childDir;
      }
    });
  }
  orderChildren() {
    // order in this order: dirs first, files after, then order alphabetically
    const dirs = this._children
      .filter(child => child instanceof FileSystemDir)
      .sort((a, b) => a.name.localeCompare(b.name));
    const files = this._children
      .filter(child => child instanceof WCFile)
      .sort((a, b) => a.name.localeCompare(b.name));
    this._children = [...dirs, ...files];
  }
}

export class FileSystemDir {
  private _name: string;
  private _children: (FileSystemDir | WCFile)[];
  constructor(name: string) {
    this._name = name;
    this._children = [];
  }
  get name() {
    return this._name;
  }
  get children() {
    return this._children;
  }
  addChildren(child: FileSystemDir | WCFile) {
    this._children.push(child);
    this.orderChildren();
  }
  orderChildren() {
    // order in this order: dirs first, files after, then order alphabetically
    const dirs = this._children
      .filter(child => child instanceof FileSystemDir)
      .sort((a, b) => a.name.localeCompare(b.name));
    const files = this._children
      .filter(child => child instanceof WCFile)
      .sort((a, b) => a.name.localeCompare(b.name));
    this._children = [...dirs, ...files];
  }
}

export class WCFile {
  private _name: string;

  constructor(private _path: string, private _content: string) {
    this._name = this._path.split("/").pop()!;
  }

  toNode() {
    return {
      file: {
        contents: this._content,
      },
    };
  }

  get path() {
    return this._path;
  }

  get name() {
    return this._name;
  }

  get content() {
    return this._content;
  }
}

export function filesToWebContainerFs(files: WCFile[]) {
  const tree: FileSystemTree = {};

  for (const file of files) {
    if (!file.path.includes("/")) {
      tree[file.path] = file.toNode();
    } else {
      const parts = file.path.split("/");
      const filename = parts.pop()!;
      let current = tree;
      for (const dir of parts) {
        if (!current[dir]) {
          current[dir] = {
            directory: {},
          };
        }
        const node = current[dir];
        if (!("directory" in node)) throw new Error("Unexpected directory but found file");
        current = node.directory;
      }
      current[filename] = file.toNode();
    }
  }
  return tree;
}

// test addFile
/* const fs = new FileSystemRoot();
fs.addFile(new WCFile("pages/index.vue", "test1"));
fs.addFile(new WCFile("pages/login.vue", "test1"));
fs.addFile(new WCFile("error.vue", "test1"));
fs.addFile(new WCFile("app.vue", "test1"));
fs.addFile(new WCFile("/server/tsconfig.json", "test1"));
fs.addFile(new WCFile("pages/gestionale/Csignup.vue", "test3"));
fs.addFile(new WCFile("pages/gestionale/Blogin.vue", "test2"));
fs.addFile(new WCFile("pages/gestionale/Aindex.vue", "test1"));
console.log(JSON.stringify(fs, null, 2)); */

// test findDir
/* const fs = new FileSystemRoot();
const res = fs.findDir("/pages/");
console.log(JSON.stringify(res, null, 2)); */

// test createDir
/* const fs = new FileSystemRoot();
fs.createDir("pages/gestionale");
fs.createDir("pages/prenotazione");
fs.createDir("pages/gestionale/prenotazione");
console.log(JSON.stringify(fs, null, 2)); */
