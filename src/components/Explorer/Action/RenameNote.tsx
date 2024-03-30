import { FC, useRef, useState } from "react";
import { getItemPath, getNodeName, getPath } from "../../../lib/utils";
import { invoke } from "@tauri-apps/api";
import { useFileTreeContext } from "../../../context/FileTreeContext";
import { AiOutlineFileMarkdown } from "react-icons/ai";
import { useOnClickOutside } from "../../../hooks/use-on-click-outside";
import { Note, useOpenNotesContext } from "../../../context/OpenNotesContext";

interface RenameNoteProps {
  path: string;
  setIsRename: (isRename: boolean) => void;
}

const RenameNote: FC<RenameNoteProps> = ({ path, setIsRename }) => {
  const [noteName, setNoteName] = useState("");
  const { readFileTree } = useFileTreeContext();
  const { openNotes, setOpenNotes, setActiveNote } = useOpenNotesContext();
  const formRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(formRef, () => setIsRename(false));

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const oldNotePath = getPath(path).replace("\\", "/");

    const newNotePath =
      getPath(getItemPath(path)).replace("\\", "/") + "/" + noteName + ".md";

    if (openNotes.some((note) => note.title === getNodeName(path))) {
      const updatedNotes = openNotes.filter(
        (note) => note.title !== getNodeName(path)
      );

      const oldNote = openNotes.find(
        (note) => note.title === getNodeName(path)
      )!;

      const renamedNote: Note = {
        title: noteName + ".md",
        path: newNotePath,
        content: oldNote.content,
      };

      updatedNotes.push(renamedNote);
      setOpenNotes(updatedNotes);
      setActiveNote(renamedNote.title);
    }

    await invoke("rename_note", {
      currentPath: oldNotePath,
      newPath: newNotePath,
    });

    await invoke("update_note_path", {
      path: oldNotePath.replace("/", "\\").replace(".md", ""),
      newPath: newNotePath.replace("/", "\\").replace(".md", ""),
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
