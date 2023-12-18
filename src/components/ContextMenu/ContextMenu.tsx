import { FC, ReactNode } from "react";
import { ContextMenuContextProvider } from "../../context/ContextMenuContext";

interface ContextMenuProps {
  children: ReactNode;
}

const ContextMenu: FC<ContextMenuProps> = ({ children }) => {
  return (
    <ContextMenuContextProvider>
      <div className="relative">{children}</div>
    </ContextMenuContextProvider>
  );
};

export default ContextMenu;
