import { FC, ReactNode } from "react";

interface NoteEditorOptionsProps {
  children: ReactNode;
}

const NoteEditorOptions: FC<NoteEditorOptionsProps> = ({ children }) => {
  return <div className="w-full py-7 flex items-center gap-7 border-b border-b-zinc-600">{children}</div>;
};

export default NoteEditorOptions;
