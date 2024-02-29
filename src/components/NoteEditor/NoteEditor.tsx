import { Markdown } from "tiptap-markdown";
import { useEditor, EditorContent } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Note, useOpenNotesContext } from "../../context/OpenNotesContext";
import { FC, useEffect, useRef, useState } from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { getPath } from "../../lib/utils";
import Tooltip from "../Tooltip";
import { HiOutlinePlus } from "react-icons/hi2";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/shell";
import { IoCloseOutline } from "react-icons/io5";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";

interface NoteEditorProps {
  note: Note;
}

const NoteEditor: FC<NoteEditorProps> = ({ note }) => {
  const { openNotes, setOpenNotes, setActiveNote } = useOpenNotesContext();
  const [references, setReferences] = useState<IReference[]>();
  const [reference, setReference] = useState("");
  const { activeNote } = useOpenNotesContext();
  const [isAddReferenceOpen, setIsAddReferenceOpen] = useState(false);
  const [noteId, setNoteId] = useState<number | undefined>();
  const formRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(formRef, () => setIsAddReferenceOpen(false));

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({
        placeholder: "Comece a escrever...",
      }),
      CharacterCount.configure({
        mode: "nodeSize",
        limit: 1000,
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

  const deleteReference = async (id: number) => {
    await invoke("delete_reference", { id });
    getReferences();
  };

  const getReferences = async () => {
    const data = await invoke<INote>("select_note", {
      path: activeNote.replace("\\", "/").replace(".md", ""),
    });

    const references = await invoke<IReference[]>("get_references", {
      noteId: data.id,
    });

    setNoteId(data.id);

    setReferences(references);
  };

  useEffect(() => {
    getReferences();
  }, [activeNote]);

  const openReference = async (url: string) => {
    await open(url);
  };

  const addReference = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await invoke("add_reference", { noteId, reference });

    const references = await invoke<IReference[]>("get_references", {
      noteId: noteId,
    });

    setReferences(references);
    setReference("");
    setIsAddReferenceOpen(false);
  };

  return (
    <>
      <EditorContent
        onKeyDown={closeNote}
        editor={editor}
        className="max-w-[calc(100vw-370px)] prose prose-invert m-h-[calc(100vh-209px)] m-0 prose-headings:m-3 prose-p:m- prose-h1:text-3xl mx-auto"
      />

      <div className="border-t border-t-zinc-700 pt-6 max-w-[calc(100vw-370px)] mx-auto">
        <div className="relative flex items-center gap-4">
          <h3 className="text-zinc-300 text-2xl font-bold">
            Referências Bibliográficas
          </h3>

          <button onClick={() => setIsAddReferenceOpen(true)}>
            <Tooltip tooltip="Nova referência">
              <HiOutlinePlus className="h-4 text-zinc-300" />
            </Tooltip>
          </button>
        </div>

        <ul className="mt-6 flex flex-col gap-2 text-left">
          {references?.map((reference) => (
            <li key={`${reference.id}${reference.reference}`}>
              <button
                className="text-zinc-400 underline text-left flex items-center gap-4"
                onClick={() => openReference(reference.reference)}
              >
                <button
                  className="text-sm pr-1 group"
                  onClick={() => deleteReference(reference.id)}
                >
                  <IoCloseOutline className="h-4 text-zinc-400 group-hover:text-zinc-200" />
                </button>
                <span>{reference.reference}</span>
              </button>
            </li>
          ))}
          {isAddReferenceOpen && (
            <form ref={formRef} onSubmit={addReference}>
              <input
                autoFocus={true}
                onChange={(e) => setReference(e.currentTarget.value)}
                type="text"
                className="w-full p-1 text-sm text-zinc-200 bg-transparent placeholder:text-xs outline-1 outline-zinc-600 focus:"
              />
            </form>
          )}
        </ul>
      </div>
    </>
  );
};

export default NoteEditor;
