import React, { FC, createContext, useContext, useState } from "react";

export type Note = {
  title: string;
  content: string;
  path: string;
};

interface OpenNotesContext {
  openNotes: Note[];
  setOpenNotes: (OpenNotes: Note[]) => void;
  activeNote: string;
  setActiveNote: (note: string) => void;
}

interface OpenNotesContextProviderProps {
  children: React.ReactNode;
}

const OpenNotesContext = createContext<OpenNotesContext>({
  openNotes: [],
  setOpenNotes: () => {},
  activeNote: "",
  setActiveNote: () => {},
});

export function useOpenNotesContext() {
  const context = useContext(OpenNotesContext);
  if (!context)
    throw new Error(
      `Context 'OpenNotesContext' is null. Did you use <OpenNotesContextProvider>?`
    );
  return context;
}

export const OpenNotesContextProvider: FC<OpenNotesContextProviderProps> = ({
  children,
}) => {
  const [OpenNotes, setOpenNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<string>("");

  return (
    <OpenNotesContext.Provider
      value={{ openNotes: OpenNotes, setOpenNotes, activeNote, setActiveNote }}
    >
      {children}
    </OpenNotesContext.Provider>
  );
};