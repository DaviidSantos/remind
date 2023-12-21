import { FC, ReactNode } from "react";
import { ContextMenuContextProvider } from "../../context/ContextMenuContext";

interface ContextMenuProps {
  children: ReactNode;
}

const ContextMenu: FC<ContextMenuProps> = ({ children }) => {
  return (
    <ContextMenuContextProvider>
      {children}
    </ContextMenuContextProvider>
  );
};

export default ContextMenu;
