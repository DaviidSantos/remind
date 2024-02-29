import { FC, ReactNode } from "react";

interface NoteEditorOptionProps {
  children: ReactNode;
}

const NoteEditorOption: FC<NoteEditorOptionProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-2 text-zinc-200 group relative">
      {children}
    </div>
  );
};

export default NoteEditorOption;
