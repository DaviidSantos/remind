import { invoke } from "@tauri-apps/api";
import { FC, useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { Note } from "../../context/OpenNotesContext";
import File from "../FileTree/File";

interface TagProps {
  name: string;
}

const Tag: FC<TagProps> = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>();

  const loadNotes = async function () {
    const noteResults = await invoke<Note[]>("get_tag_notes", { tag: name });
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
        </div>

        {isOpen && (
          <div className="flex flex-col my-1">
            {notes.map((note) => (
              <File path={`${note.path}.md`} key={note.path} />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Tag;
