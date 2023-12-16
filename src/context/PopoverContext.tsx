import React, { FC, createContext, useContext, useState } from "react";

interface PopoverContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface PopoverContextProviderProps {
  children: React.ReactNode;
}

const PopoverContext = createContext<PopoverContext>({
  isOpen: false,
  setIsOpen: () => {},
});

export function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context)
    throw new Error(
      `Context 'Popover Context' is null. Did you use <PopoverContextProvider>?`
    );
  return context;
}

export const PopoverContextProvider: FC<PopoverContextProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PopoverContext.Provider>
  );
};
