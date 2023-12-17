import { useState } from "react";
import { useFileTreeContext } from "../../../context/FileTreeContext";
import { getPath } from "../../../lib/utils";
import { invoke } from "@tauri-apps/api";
import { usePopoverContext } from "../../../context/PopoverContext";

const CreateFolder = () => {
  const [folderName, setFolderName] = useState<string>("");
  const { currentNode, readFileTree } = useFileTreeContext();
  const { setIsOpen } = usePopoverContext();

  const createFolder = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let folderPath =
      getPath(currentNode!).replace("\\", "/") + "/" + folderName;

    await invoke("create_folder", { path: folderPath });
    setIsOpen(false);
    readFileTree();
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={createFolder}>
      <h3 className="text-xs text-zinc-200 font-bold">Nova pasta</h3>
      <input
        onChange={(e) => setFolderName(e.currentTarget.value)}
        type="text"
        className="w-full p-1 text-sm text-zinc-200 rounded-md border border-zinc-700 bg-zinc-900 placeholder:text-xs"
        placeholder="Nome da pasta"
      />
      <button className="bg-zinc-200 p-1.5 rounded-md text-xs text-zinc-900 font-bold">
        Criar pasta
      </button>
    </form>
  );
};

export default CreateFolder;
