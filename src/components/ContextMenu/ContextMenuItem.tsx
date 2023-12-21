import { FC, ReactNode } from "react";
import { useContextMenuContext } from "../../context/ContextMenuContext";

interface ContextMenuItemProps {
  children: ReactNode;
  action: () => Promise<void>;
}

const ContextMenuItem: FC<ContextMenuItemProps> = ({ children, action }) => {
  const { setIsOpen } = useContextMenuContext();

  const handleClick = function () {
    action();
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full p-1.5 flex gap-2 hover:bg-zinc-800"
    >
      {children}
    </button>
  );
};

export default ContextMenuItem;
