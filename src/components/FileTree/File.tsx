import { FC } from "react";
import { getNodeName, getPath } from "../../lib/utils";
import { useFileTreeContext } from "../../context/FileTreeContext";
import { AiOutlineFileMarkdown } from "react-icons/ai";
import ContextMenu from "../ContextMenu/ContextMenu";
import ContextMenuContent from "../ContextMenu/ContextMenuContent";
import ContextMenuTrigger from "../ContextMenu/ContextMenuTrigger";
import ContextMenuItem from "../ContextMenu/ContextMenuItem";
import { PiTrashThin } from "react-icons/pi";
import { invoke } from "@tauri-apps/api";

interface FileProps {
  path: string;
}

const File: FC<FileProps> = ({ path }) => {
  const { currentNode, setCurrentNode, readFileTree } = useFileTreeContext();

  const deleteNote = async function () {
    const notePath = getPath(path!).replace("\\", "/");

    await invoke("delete_note", { path: notePath });
    readFileTree();
  };

  return (
    <ContextMenu>
      <div className="relative">
        <ContextMenuTrigger>
          <button
            onClick={() => setCurrentNode(path)}
            className={`text-sm flex break-all text-left py-1 px-2 rounded-md text-zinc-200 gap-2 items-center ${
              currentNode === path ? "bg-zinc-500/30 text-zinc-200" : ""
            }`}
          >
            <AiOutlineFileMarkdown className="h-4" />
            <span>{getNodeName(path)}</span>
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem action={deleteNote}>
            <PiTrashThin className="text-zinc-200" />
            <span className="text-xs text-zinc-200">Apagar anotação</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </div>
    </ContextMenu>
  );
};
export default File;
