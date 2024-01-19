import React, { FC, createContext, useContext, useState } from "react";

interface ExplorerContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  explorerMode: string;
  setExplorerMode: (mode: string) => void;
}

interface ExplorerContextProviderProps {
  children: React.ReactNode;
}

const ExplorerContext = createContext<ExplorerContext>({
  isOpen: false,
  setIsOpen: () => {},
  explorerMode: "file_tree",
  setExplorerMode: () => {},
});

export function useExplorerContext() {
  const context = useContext(ExplorerContext);
  if (!context)
    throw new Error(
      `Context 'Explorer Context' is null. Did you use <ExplorerContextProvider>?`
    );
  return context;
}

export const ExplorerContextProvider: FC<ExplorerContextProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [explorerMode, setExplorerMode] = useState("FILE_TREE");

  return (
    <ExplorerContext.Provider
      value={{ isOpen, setIsOpen, explorerMode, setExplorerMode }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};
