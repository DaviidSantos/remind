import React, { FC, createContext, useContext, useState } from "react";

interface ContextMenuContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface ContextMenuContextProviderProps {
  children: React.ReactNode;
}

const ContextMenuContext = createContext<ContextMenuContext>({
  isOpen: false,
  setIsOpen: () => {},
});

export function useContextMenuContext() {
  const context = useContext(ContextMenuContext);
  if (!context)
    throw new Error(
      `Context 'ContextMenu Context' is null. Did you use <ContextMenuContextProvider>?`
    );
  return context;
}

export const ContextMenuContextProvider: FC<ContextMenuContextProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContextMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ContextMenuContext.Provider>
  );
};
