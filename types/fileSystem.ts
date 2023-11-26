type FileSystemRoot = {
  [name: string]: FileSystemDir | FileSystemFile;
};
type FileSystemDir = {
  directory: FileSystemRoot;
};
type FileSystemFile = InstanceType<typeof WCFile>;
