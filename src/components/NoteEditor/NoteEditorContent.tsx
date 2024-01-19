import { PiBookmarkSimple, PiTagSimpleLight } from "react-icons/pi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { useOpenNotesContext } from "../../context/OpenNotesContext";
import NoteEditorOption from "./NoteEditorOption";
import NoteEditorOptions from "./NoteEditorOptions";
import NoteEditor from "./NoteEditor";

const NoteEditorContent = () => {
  const { openNotes, activeNote } = useOpenNotesContext();

  return (
    <div className="w-full px-10 py-4">
      <h2 className="text-2xl text-zinc-200 font-bold">
        {openNotes
          .find((note) => note.title === activeNote)
          ?.title.replace(".md", "")}
      </h2>

      <NoteEditorOptions>
        <NoteEditorOption>
          <PiTagSimpleLight className="h-4 text-zinc-200 group-hover:text-zinc-400" />
          <span className="text-xs text-zinc-200 group-hover:text-zinc-400">
            Tags
          </span>
        </NoteEditorOption>

        <NoteEditorOption>
          <MdOutlineCollectionsBookmark className="h-4 text-zinc-200 group-hover:text-zinc-400" />
          <span className="text-xs text-zinc-200 group-hover:text-zinc-400">
            Coleção
          </span>
        </NoteEditorOption>

        <NoteEditorOption>
          <PiBookmarkSimple className="h-4 text-zinc-200 group-hover:text-zinc-400" />
          <span className="text-xs text-zinc-200 group-hover:text-zinc-400">
            Favorito
          </span>
        </NoteEditorOption>
      </NoteEditorOptions>

      {openNotes.map(
        (note) => note.title === activeNote && <NoteEditor note={note} />
      )}
    </div>
  );
};

export default NoteEditorContent;
