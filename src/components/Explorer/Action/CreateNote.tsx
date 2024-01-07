import { useState } from "react";
import { useFileTreeContext } from "../../../context/FileTreeContext";
import { extractFolderPath, getPath } from "../../../lib/utils";
import { invoke } from "@tauri-apps/api";
import { usePopoverContext } from "../../../context/PopoverContext";
import { useOpenNotesContext } from "../../../context/OpenNotesContext";

const CreateNote = () => {
  const [noteName, setNoteName] = useState<string>("");
  const { currentNode, readFileTree } = useFileTreeContext();
  const { openNotes, setOpenNotes, setActiveNote } = useOpenNotesContext();
  const { setIsOpen } = usePopoverContext();

  const createNote = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let notePath =
      extractFolderPath(getPath(currentNode!)).replace("\\", "/") +
      "/" +
      noteName;

    await invoke("create_note", { notePath });

    const note = {
      title: noteName + ".md",
      content: "",
      path: notePath,
    };

    const updatedNotes = [...openNotes, note];
    setOpenNotes(updatedNotes);
    setActiveNote(note.title);

    setIsOpen(false);
    readFileTree();
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={createNote}>
      <h3 className="text-xs text-zinc-200 font-bold">Nova anotação</h3>
      <input
        autoFocus={true}
        onChange={(e) => setNoteName(e.currentTarget.value)}
        type="text"
        className="w-full p-1 text-sm text-zinc-200 rounded-md border border-zinc-700 bg-zinc-900 placeholder:text-xs"
        placeholder="Título"
      />
      <button className="bg-zinc-200 p-1.5 border border-zinc-200 rounded-md text-xs text-zinc-900 font-bold hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-200">
        Criar anotação
      </button>
    </form>
  );
};

export default CreateNote;
