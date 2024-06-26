import { FC, useState } from "react";
import { getNodeName, getPath } from "../../lib/utils";
import { useFileTreeContext } from "../../context/FileTreeContext";
import { AiOutlineFileMarkdown } from "react-icons/ai";
import ContextMenu from "../ContextMenu/ContextMenu";
import ContextMenuContent from "../ContextMenu/ContextMenuContent";
import ContextMenuTrigger from "../ContextMenu/ContextMenuTrigger";
import ContextMenuItem from "../ContextMenu/ContextMenuItem";
import { PiPencilLight, PiTrashThin } from "react-icons/pi";
import { invoke } from "@tauri-apps/api";
import RenameNote from "../Explorer/Action/RenameNote";
import { useOpenNotesContext } from "../../context/OpenNotesContext";
import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

interface FileProps {
  path: string;
}

const File: FC<FileProps> = ({ path }) => {
  const { currentNode, setCurrentNode, readFileTree } = useFileTreeContext();
  const [isRename, setIsRename] = useState(false);
  const { openNotes, setOpenNotes, activeNote, setActiveNote } =
    useOpenNotesContext();

  const deleteNote = async function () {
    const notePath = getPath(path!);
    console.log(notePath.replace(".md", ""));

    await invoke("delete_note", { path: notePath });
    readFileTree();

    await invoke("delete_note_db", { path: notePath.replace(".md", "") });

    if (openNotes.some((note) => note.title === getNodeName(path))) {
      let index = 0;

      if (activeNote === getNodeName(path)) {
        index = openNotes.findIndex((note) => note.title === getNodeName(path));
      }

      const updatedOpenNotes = openNotes.filter(
        (note) => note.title !== getNodeName(path)
      );

      setOpenNotes(updatedOpenNotes);

      if (index !== 0) {
        setActiveNote(updatedOpenNotes[index - 1].title);
      } else {
        setActiveNote(updatedOpenNotes[index].title);
      }
    }
  };

  const openNote = async function () {
    if (!openNotes.some((note) => note.title === getPath(path))) {
      const note = {
        title: getPath(path),
        content: await readTextFile(getPath(path), {
          dir: BaseDirectory.Document,
        }),
        path,
      };

      const updatedNotes = [...openNotes, note];
      setOpenNotes(updatedNotes);
      setActiveNote(getPath(path));
    }
  };

  return (
    <ContextMenu>
      <div className="relative">
        <ContextMenuTrigger>
          {isRename ? (
            <RenameNote path={path} setIsRename={setIsRename} />
          ) : (
            <button
              onClick={() => setCurrentNode(path)}
              onDoubleClick={() => openNote()}
              className={`text-sm flex break-all text-left py-1 px-2 rounded-md text-zinc-200 gap-2 items-center ${
                currentNode === path ? "bg-zinc-500/30 text-zinc-200" : ""
              }`}
            >
              <AiOutlineFileMarkdown className="h-4" />
              <span>{getNodeName(path).replace(".md", "")}</span>
            </button>
          )}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem action={deleteNote}>
            <PiTrashThin className="text-zinc-200" />
            <span className="text-xs text-zinc-200">Apagar anotação</span>
          </ContextMenuItem>
          <ContextMenuItem action={async () => setIsRename(true)}>
            <PiPencilLight className="text-zinc-400" />
            <span className="text-xs text-zinc-200">Renomear anotação</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </div>
    </ContextMenu>
  );
};
export default File;
