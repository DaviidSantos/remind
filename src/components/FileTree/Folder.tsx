import { FC, useState } from "react";
import { TreeNode, useFileTreeContext } from "../../context/FileTreeContext";
import { getNodeName, getPath } from "../../lib/utils";
import File from "./File";
import { AiOutlineFolder, AiOutlineFolderOpen } from "react-icons/ai";
import ContextMenu from "../ContextMenu/ContextMenu";
import ContextMenuTrigger from "../ContextMenu/ContextMenuTrigger";
import ContextMenuContent from "../ContextMenu/ContextMenuContent";
import ContextMenuItem from "../ContextMenu/ContextMenuItem";
import { PiPencilLight, PiTrashThin } from "react-icons/pi";
import { invoke } from "@tauri-apps/api";
import RenameFolder from "../Explorer/Action/RenameFolder";

interface FolderProps {
  path: string | undefined;
  children: TreeNode[] | undefined;
}

const Folder: FC<FolderProps> = ({ path, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentNode, setCurrentNode, readFileTree } = useFileTreeContext();
  const [isRename, setIsRename] = useState(false);

  const deleteFolder = async function () {
    const folderPath = getPath(path!).replace("\\", "/");

    await invoke("delete_folder", { path: folderPath });
    readFileTree();
  };

  return (
    <ContextMenu>
      <div className="relative">
        <ContextMenuTrigger>
          {isRename ? (
            <RenameFolder path={path!} setIsRename={setIsRename} />
          ) : (
            <button
              className={`flex items-center py-1 px-2 rounded-md break-all text-left ${
                currentNode === path ? "bg-zinc-500/30" : ""
              }`}
              onClick={() => {
                setIsOpen(!isOpen);
                setCurrentNode(path!);
              }}
            >
              {isOpen ? (
                <AiOutlineFolderOpen className="text-zinc-200 h-4" />
              ) : (
                <AiOutlineFolder className="text-zinc-200 h-4" />
              )}
              <span className={`text-zinc-200 text-sm ml-2`}>
                {getNodeName(path!)}
              </span>
            </button>
          )}
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem action={deleteFolder}>
            <PiTrashThin className="text-zinc-200" />
            <span className="text-xs text-zinc-200">Apagar pasta</span>
          </ContextMenuItem>
          <ContextMenuItem action={async () => setIsRename(true)}>
            <PiPencilLight className="text-zinc-200" />
            <span className="text-xs text-zinc-200">Renomear pasta</span>
          </ContextMenuItem>
        </ContextMenuContent>

        {children && (
          <div
            className={`border-l border-l-zinc-700 pl-3 ml-3 mt-1 ${
              isOpen ? "flex flex-col gap-2" : "hidden"
            }`}
          >
            {children.map((node) => (
              <>
                {node.is_folder ? (
                  <Folder {...node} />
                ) : (
                  <File path={node.path} />
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </ContextMenu>
  );
};
export default Folder;
