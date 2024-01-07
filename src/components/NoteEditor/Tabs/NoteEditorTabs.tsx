import { useOpenNotesContext } from "../../../context/OpenNotesContext";
import Tab from "./Tab";

const NoteEditorTabs = () => {
  const { openNotes } = useOpenNotesContext();

  return (
    <div className="w-full flex">
      {openNotes.map((note, index) => (
        <Tab title={note.title} key={`${note.title}-${index}`} />
      ))}
    </div>
  );
};

export default NoteEditorTabs;
