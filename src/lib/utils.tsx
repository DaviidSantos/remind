export const getNodeName = (filePath: string) => {
  if (!filePath) {
    return "";
  }

  const parts = filePath.split("\\");
  const lastPart = parts[parts.length - 1];
  return lastPart;
};

export const getItemPath = (path: string) => {
  if (!path) {
    return "";
  }

  const parts = path.split("\\");
  parts.pop();

  const itemPath = parts.join("\\");
  return itemPath;
};

export const getPath = (path: string) => {
  const remindSubstring = "Documents\\";
  const index = path.indexOf(remindSubstring);

  if (index !== -1) {
    return path.substring(index + remindSubstring.length);
  } else {
    return "";
  }
};

export const extractFolderPath = (input: string): string => {
  const regex = /\\[^\\]+\.md$/;

  if (regex.test(input)) {
    return (input = input.replace(regex, ""));
  }

  return input;
};
