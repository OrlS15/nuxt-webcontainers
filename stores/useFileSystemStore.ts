import { FileSystemRoot, type WCFile } from "#imports";

export default defineStore("useFileSystemStore", () => {
  const selectedFile = ref<WCFile>();
  const fileSystem = ref<FileSystemRoot>();

  function createFileSystem(files?: WCFile[]) {
    const fs = new FileSystemRoot();
    files?.forEach(f => {
      fs.addFile(f);
    });
    fileSystem.value = fs;
  }

  function addFile(file: WCFile) {
    fileSystem.value?.addFile(file);
  }

  function createDir(path: string) {
    fileSystem.value?.createDir(path);
  }

  return {
    selectedFile,
    fileSystem,
    createFileSystem,
    addFile,
    createDir,
  };
});
