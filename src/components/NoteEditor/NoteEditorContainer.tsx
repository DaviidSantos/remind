import { FC, ReactNode } from "react";
import { useOpenNotesContext } from "../../context/OpenNotesContext";

interface NoteEditorContainerProps {
  children: ReactNode;
}

const NoteEditorContainer: FC<NoteEditorContainerProps> = ({ children }) => {
  const { openNotes } = useOpenNotesContext();

  return (
    <div
      className={`w-full bg-zinc-800 h-full ${
        openNotes.length > 0 ? "" : "flex justify-center items-center"
      }`}
    >
      {openNotes.length > 0 ? (
        <div>{children}</div>
      ) : (
        <div>
          <h3 className="text-3xl text-zinc-700 font-black">
            Crie ou abra uma anotação!
          </h3>
        </div>
      )}
    </div>
  );
};

export default NoteEditorContainer;
