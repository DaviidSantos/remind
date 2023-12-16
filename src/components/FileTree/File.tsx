import { FC } from "react";
import { getNodeName } from "../../lib/utils";
import { useFileTreeContext } from "../../context/FileTreeContext";
import { AiOutlineFileMarkdown } from "react-icons/ai";

interface FileProps {
  path: string;
}

const File: FC<FileProps> = ({ path }) => {
  const { currentNode, setCurrentNode } = useFileTreeContext();

  return (
    <div className="relative">
      <button
        onClick={() => setCurrentNode(path)}
        className={`text-sm inline-flex break-all text-left py-1 px-2 rounded-md text-zinc-200 gap-2 items-center ${
          currentNode === path ? "bg-zinc-500/30 text-zinc-200" : ""
        }`}
      >
        <AiOutlineFileMarkdown className="h-4" />
        <span>{getNodeName(path)}</span>
      </button>
    </div>
  );
};
export default File;
