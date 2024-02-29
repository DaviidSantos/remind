import { invoke } from "@tauri-apps/api";
import React, { FC, useEffect, useState } from "react";
import { usePopoverContext } from "../../context/PopoverContext";
import { useOpenNotesContext } from "../../context/OpenNotesContext";

interface AddReferenceProps {
  setReferences: (references: IReference[]) => void;
}

const AddReference: FC<AddReferenceProps> = ({ setReferences }) => {
  const [reference, setReference] = useState<string>("");
  const [noteId, setNoteId] = useState<number | undefined>();
  const { setIsOpen } = usePopoverContext();
  const { activeNote } = useOpenNotesContext();

  const selectNote = async function () {
    const data = await invoke<INote>("select_note", {
      path: activeNote.replace("\\", "/").replace(".md", ""),
    });

    setNoteId(data.id);
  };

  useEffect(() => {
    selectNote();
  }, [activeNote]);

  const addReference = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await invoke("add_reference", { noteId, reference });

    const references = await invoke<IReference[]>("get_references", {
      noteId: noteId,
    });

    setReferences(references);
    setIsOpen(false);
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={addReference}>
      <h3 className="text-xs text-zinc-200 font-bold">Nova referência</h3>
      <input
        autoFocus={true}
        onChange={(e) => setReference(e.currentTarget.value)}
        type="text"
        className="w-full p-1 text-sm text-zinc-200 rounded-md border border-zinc-700 bg-zinc-900 placeholder:text-xs"
        placeholder="Tag"
      />
      <button className="bg-zinc-200 p-1.5 border border-zinc-200 rounded-md text-xs text-zinc-900 font-bold hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-200">
        Adicionar referência
      </button>
    </form>
  );
};

export default AddReference;
