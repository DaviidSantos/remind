import { FC, ReactNode } from "react";

interface ContextMenuItemProps {
  children: ReactNode;
  action: () => Promise<void>;
}

const ContextMenuItem: FC<ContextMenuItemProps> = ({ children, action }) => {
  return (
    <button onClick={action} className="w-full p-1.5 flex gap-2 hover:bg-zinc-800 rounded-md">
      {children}
    </button>
  );
};

export default ContextMenuItem;
