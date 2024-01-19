import { Markdown } from "tiptap-markdown";
import { useEditor, EditorContent } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Note, useOpenNotesContext } from "../../context/OpenNotesContext";
import { FC } from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { getPath } from "../../lib/utils";

interface NoteEditorProps {
  note: Note;
}

const NoteEditor: FC<NoteEditorProps> = ({ note }) => {
  const { openNotes, setOpenNotes, setActiveNote } =
    useOpenNotesContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({
        placeholder: "Comece a escrever...",
      }),
      CharacterCount.configure({
        mode: "nodeSize",
        limit: 2000,
      }),
    ],
    onUpdate: ({ editor }) => {
      note.content = editor.storage.markdown.getMarkdown();
      saveNote();
    },
    autofocus: true,
    editorProps: {
      attributes: {
        class: "outline-none flex-wrap m-0",
      },
    },
    content: note.content,
  });

  const closeNote = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.which == 87) {
      if (e.ctrlKey) {
        const updatedNotes = openNotes.filter(
          (itemNote) => itemNote.title !== note.title
        );
        setOpenNotes(updatedNotes);

        setActiveNote(updatedNotes[0].title);
      }
    }
  };

  const saveNote = async () => {
    const path = getPath(note.path);
    await writeTextFile(
      { path, contents: note.content },
      { dir: BaseDirectory.Document }
    );
  };

  return (
    <EditorContent
      onKeyDown={closeNote}
      editor={editor}
      className="max-w-[calc(100vw-370px)] prose prose-invert m-h-[calc(100vh-209px)] m-0 prose-headings:m-3 prose-p:m-1"
    />
  );
};

export default NoteEditor;
