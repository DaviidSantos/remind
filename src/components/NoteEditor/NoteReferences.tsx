import { Listbox } from "@headlessui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useFileTreeContext } from "../../context/FileTreeContext";
import { getNodeName } from "../../lib/utils";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { useOpenNotesContext } from "../../context/OpenNotesContext";

interface Option {
  id: number;
  text: string;
}

interface NoteReferencesOptions {
  setIsOpen: (isOpen: boolean) => void;
  addReference: (reference: string) => Promise<void>;
}

const NoteReferences: FC<NoteReferencesOptions> = ({
  setIsOpen,
  addReference,
}) => {
  const [options, setOptions] = useState<Option[] | undefined>();
  const { fileTree } = useFileTreeContext();
  const { activeNote } = useOpenNotesContext();
  const noteReferenceRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(noteReferenceRef, () => setIsOpen(false));

  const [activeItem, setActiveItem] = useState<Option>();

  const getOptions = () => {
    const fileOptions: Option[] = [];
    fileOptions?.push({ id: 0, text: "Selecione uma anotação..." });

    fileTree?.children.forEach((node, index) => {
      const option: Option = {
        id: index + 1,
        text: node.path,
      };

      fileOptions?.push(option);
    });

    setOptions(fileOptions);
    setActiveItem(fileOptions[0]);
  };

  useEffect(() => {
    getOptions();
    console.log("anotação certa");
    console.log(activeNote);
  }, []);

  const setNote = (value: Option) => {
    setIsOpen(false);
    addReference(value.text);
  };

  return (
    options &&
    activeItem && (
      <Listbox value={activeItem} onChange={setNote} ref={noteReferenceRef}>
        <div className="relative">
          <Listbox.Button className="w-30 text-left text-zinc-300 py-1.5 rounded-md w-fit border-b border-b-zinc-700 text-sm">
            {activeItem.text}
          </Listbox.Button>
          <Listbox.Options className="bg-zinc-800 border border-zinc-700 p-4 rounded-lg w-fit absolute top-10 z-50">
            {options
              .filter((node) => !node.text.endsWith(".db"))
              .filter((node) => !node.text.includes(activeNote))
              .map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  className="cursor-pointer p-1 hover:bg-zinc-700 rounded-md text-zinc-300 text-sm"
                >
                  {getNodeName(option.text).replace(".md", "")}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </div>
      </Listbox>
    )
  );
};

export default NoteReferences;
