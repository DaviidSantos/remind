import { invoke } from "@tauri-apps/api";
import React, { useState } from "react";
import { usePopoverContext } from "../../../context/PopoverContext";
import { useTagsContext } from "../../../context/TagsContext";

const CreateTag = () => {
  const [tag, setTag] = useState<string>("");
  const { setIsOpen } = usePopoverContext();
  const { readTags } = useTagsContext();

  const createTag = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await invoke("add_tag", { name: tag });
    readTags();
    setIsOpen(false);
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={createTag}>
      <h3 className="text-xs text-zinc-200 font-bold">Nova tag</h3>
      <input
        autoFocus={true}
        onChange={(e) => setTag(e.currentTarget.value)}
        type="text"
        className="w-full p-1 text-sm text-zinc-200 rounded-md border border-zinc-700 bg-zinc-900 placeholder:text-xs"
        placeholder="Tag"
      />
      <button className="bg-zinc-200 p-1.5 border border-zinc-200 rounded-md text-xs text-zinc-900 font-bold hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-200">
        Criar tag
      </button>
    </form>
  );
};

export default CreateTag;
