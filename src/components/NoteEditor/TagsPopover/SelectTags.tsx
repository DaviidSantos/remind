import { Listbox, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { Tag, useTagsContext } from "../../../context/TagsContext";
import { BsChevronExpand } from "react-icons/bs";
import { invoke } from "@tauri-apps/api";

const title: Tag = {
  id: 0,
  name: "Adicionar uma tag",
};

interface SelectTagsProps {
  noteId: number | undefined;
}

const SelectTags: FC<SelectTagsProps> = ({ noteId }) => {
  const { tags, readTags } = useTagsContext();

  const addTag = async function (tag: Tag) {
    await invoke("add_note_tag", { noteId, tagId: tag.id });
    readTags();
  };

  return (
    tags && (
      <Listbox value={title} onChange={addTag}>
        <div className="relative my-2 z-50">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-zinc-900 border border-zinc-800 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-zinc-200 text-xs">
              {title.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-900 border border-zinc-800 p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {tags.map((option, optionIndx) => (
                <>
                  <Listbox.Option
                    key={optionIndx}
                    className="relative cursor-default select-none p-2 text-zinc-200 hover:bg-zinc-700 rounded-md"
                    value={option}
                  >
                    <button onClick={() => addTag(option)}>
                      <span className="text-xs">{option.name}</span>
                    </button>
                  </Listbox.Option>
                </>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    )
  );
};

export default SelectTags;
