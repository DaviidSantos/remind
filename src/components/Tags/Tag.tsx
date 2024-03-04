import { invoke } from "@tauri-apps/api";
import { FC, useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { Note } from "../../context/OpenNotesContext";
import File from "../FileTree/File";

interface TagProps {
  id: number;
  name: string;
  readTags: () => Promise<void>;
}

const Tag: FC<TagProps> = ({ id, name, readTags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>();

  const deleteTag = async function () {
    await invoke("delete_tag", { id });
    readTags();
  };

  const loadNotes = async function () {
    const noteResults = await invoke<Note[]>("get_tag_notes", { id });
    setNotes(noteResults);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    notes && (
      <div className="my-2">
        <div className="flex items-center justify-between group">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex gap-2 items-center text-zinc-200 group-hover:text-zinc-300"
          >
            {isOpen ? (
              <AiOutlineDown className="h-3" />
            ) : (
              <AiOutlineRight className="h-3" />
            )}
            <span className="text-sm">{name}</span>
          </button>
          <button className="text-sm pr-1 group" onClick={deleteTag}>
            <IoCloseOutline className="h-3 text-zinc-400 group-hover:text-zinc-200" />
          </button>
        </div>

        {isOpen && (
          <div className="flex flex-col my-1">
            {notes.map((note) => (
              <File path={note.path + ".md"} key={note.path} />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Tag;
