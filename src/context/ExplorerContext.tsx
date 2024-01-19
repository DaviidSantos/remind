import React, { FC, createContext, useContext, useState } from "react";

interface ExplorerContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface ExplorerContextProviderProps {
  children: React.ReactNode;
}

const ExplorerContext = createContext<ExplorerContext>({
  isOpen: false,
  setIsOpen: () => {},
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

  return (
    <ExplorerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ExplorerContext.Provider>
  );
};
