import { FC } from "react";
import { useOpenNotesContext } from "../../../context/OpenNotesContext";
import { AiOutlineClose } from "react-icons/ai";
import { getNodeName } from "../../../lib/utils";

interface TabProps {
  title: string;
}

const Tab: FC<TabProps> = ({ title }) => {
  const { activeNote, setActiveNote, openNotes, setOpenNotes } =
    useOpenNotesContext();

  const closeNote = function () {
    let index = 0;

    if (activeNote === title) {
      index = openNotes.findIndex((note) => note.title === title);
    }

    const updatedOpenNotes = openNotes.filter((note) => note.title !== title);
    setOpenNotes(updatedOpenNotes);

    if (index !== 0) {
      setActiveNote(updatedOpenNotes[index - 1].title);
    } else {
      setActiveNote(updatedOpenNotes[index].title);
    }
  };

  return (
    <div
      className={`p-2 w-fit text-zinc-200 text-xs flex items-center gap-2 ${
        activeNote === title ? "bg-zinc-800" : "bg-zinc-900"
      }`}
    >
      <button onClick={() => setActiveNote(title)}>
        {getNodeName(title.replace(".md", ""))}
      </button>
      <button onClick={closeNote}>
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default Tab;
