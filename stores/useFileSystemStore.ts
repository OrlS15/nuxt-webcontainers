import { FileSystemDir, FileSystemRoot, type WCFile } from "#imports";

export default defineStore("useFileSystemStore", () => {
  const fileSystem = ref<FileSystemRoot>();
  const selectedFile = ref<WCFile>();
  const lastSelectedFolder = ref<FileSystemDir>();

  function createFileSystem(_files?: WCFile[]) {
    const fs = new FileSystemRoot();
    _files?.forEach(f => {
      fs.addFile(f);
    });
    fileSystem.value = fs;
  }

  function addFile(file: WCFile) {
    fileSystem.value?.addFile(file);
  }

  function createDir(fullpath: string) {
    fileSystem.value?.createDir(fullpath);
  }

  return {
    selectedFile,
    fileSystem,
    lastSelectedFolder,
    createFileSystem,
    addFile,
    createDir,
  };
});
