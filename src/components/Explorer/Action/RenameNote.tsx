import { FC, useRef, useState } from "react";
import { getItemPath, getPath } from "../../../lib/utils";
import { invoke } from "@tauri-apps/api";
import { useFileTreeContext } from "../../../context/FileTreeContext";
import { AiOutlineFileMarkdown } from "react-icons/ai";
import { useOnClickOutside } from "../../../hooks/use-on-click-outside";

interface RenameNoteProps {
  path: string;
  setIsRename: (isRename: boolean) => void;
}

const RenameNote: FC<RenameNoteProps> = ({ path, setIsRename }) => {
  const [noteName, setNoteName] = useState("");
  const { readFileTree } = useFileTreeContext();
  const formRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(formRef, () => setIsRename(false));

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const oldNotePath = getPath(path).replace("\\", "/");

    const newNotePath =
      getPath(getItemPath(path)).replace("\\", "/") + "/" + noteName + ".md";

    await invoke("rename_note", {
      currentPath: oldNotePath,
      newPath: newNotePath,
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
      <AiOutlineFileMarkdown className="text-zinc-200 h-4" />
      <input
        type="text"
        onChange={(e) => setNoteName(e.currentTarget.value)}
        autoFocus={true}
        className="w-full p-1 text-sm text-zinc-200 bg-transparent placeholder:text-xs focus:outline-none"
      />
    </form>
  );
};

export default RenameNote;
