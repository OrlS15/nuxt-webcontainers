export default (path: string) => {
  const splitPath = path.split("/").filter(p => p);
  const fileName = splitPath.pop();

  return {
    directories: splitPath,
    fileName,
  };
};
