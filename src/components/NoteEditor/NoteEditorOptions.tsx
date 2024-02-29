import { FC, ReactNode } from "react";

interface NoteEditorOptionsProps {
  children: ReactNode;
}

const NoteEditorOptions: FC<NoteEditorOptionsProps> = ({ children }) => {
  return (
    <div className="w-full py-6 flex items-center gap-7 border-b border-b-zinc-600 max-w-[calc(100vw-370px)] mx-auto">
      {children}
    </div>
  );
};

export default NoteEditorOptions;
