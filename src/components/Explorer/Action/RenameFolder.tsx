import { FC, useRef, useState } from "react";
import { getItemPath, getPath } from "../../../lib/utils";
import { invoke } from "@tauri-apps/api";
import { useFileTreeContext } from "../../../context/FileTreeContext";
import { AiOutlineFolder } from "react-icons/ai";
import { useOnClickOutside } from "../../../hooks/use-on-click-outside";

interface RenameFolderProps {
  path: string;
  setIsRename: (isRename: boolean) => void;
}

const RenameFolder: FC<RenameFolderProps> = ({ path, setIsRename }) => {
  const [folderName, setFolderName] = useState("");
  const { readFileTree } = useFileTreeContext();
  const formRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(formRef, () => setIsRename(false));

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const oldFolderPath = getPath(path).replace("\\", "/");

    const newFolderPath =
      getPath(getItemPath(path)).replace("\\", "/") + "/" + folderName;

    await invoke("rename_folder", {
      currentPath: oldFolderPath,
      newPath: newFolderPath,
    });

    readFileTree();
    setIsRename(false);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <AiOutlineFolder className="text-zinc-200 h-4" />
      <input
        type="text"
        onChange={(e) => setFolderName(e.currentTarget.value)}
        autoFocus={true}
        className="w-full p-1 text-sm text-zinc-200 bg-transparent placeholder:text-xs focus:outline-none"
      />
    </form>
  );
};

export default RenameFolder;
