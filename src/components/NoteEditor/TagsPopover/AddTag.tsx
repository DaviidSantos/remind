import { FC, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useOnClickOutside } from "../../../hooks/use-on-click-outside";
import { invoke } from "@tauri-apps/api";
import { PiPencilLight } from "react-icons/pi";

interface AddTagProps {
  note: INote;
  selectNote: () => Promise<void>;
}

const AddTag: FC<AddTagProps> = ({ note, selectNote }) => {
  const [tag, setTag] = useState(note.tag);
  const [isEditTag, setIsEditTag] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(formRef, () => setIsEditTag(false));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await invoke("update_tag", { noteId: note.id, tag });
    selectNote();
    setIsEditTag(false);
  };

  return (
    <div className="flex flex-col gap-2 w-32">
      <div className="flex items-center justify-between w-full pb-2 border-b border-b-zinc-800">
        <p className="text-xs text-zinc-400 font-medium">Tag</p>

        {note.tag == "" ? (
          <button onClick={() => setIsEditTag(true)}>
            <IoMdAdd className="h-3 w-3" />
          </button>
        ) : (
          <button onClick={() => setIsEditTag(true)}>
            <PiPencilLight className="text-zinc-400 h-3 w-3" />
          </button>
        )}
      </div>

      {isEditTag ? (
        <>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              onChange={(e) => setTag(e.currentTarget.value)}
              autoFocus={true}
              className="w-full p-1 text-sm text-zinc-200 bg-transparent placeholder:text-xs focus:outline-none"
            />
          </form>
        </>
      ) : (
        <>
          {tag == "" ? (
            <p className="text-sm text-zinc-400 text-left">Adicione uma tag</p>
          ) : (
            <p className="text-xs p-1 rounded-full bg-zinc-100 text-zinc-900 block">
              {tag}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AddTag;
