import { FC, ReactNode } from "react";

interface NoteEditorOptionProps {
  children: ReactNode;
}

const NoteEditorOption: FC<NoteEditorOptionProps> = ({ children }) => {
  return (
    <button className="flex items-center gap-2 text-zinc-200 group">
      {children}
    </button>
  );
};

export default NoteEditorOption;
