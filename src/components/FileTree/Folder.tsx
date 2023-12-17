import { FC, useState } from "react";
import { TreeNode, useFileTreeContext } from "../../context/FileTreeContext";
import { getNodeName } from "../../lib/utils";
import File from "./File";
import { AiOutlineFolder, AiOutlineFolderOpen } from "react-icons/ai";

interface FolderProps {
  path: string | undefined;
  children: TreeNode[] | undefined;
}

const Folder: FC<FolderProps> = ({ path, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentNode, setCurrentNode } = useFileTreeContext();

  return (
    <div>
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
  );
};
export default Folder;