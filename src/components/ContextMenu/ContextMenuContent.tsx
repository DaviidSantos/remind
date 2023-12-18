import { FC, ReactNode, useRef } from "react";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { useContextMenuContext } from "../../context/ContextMenuContext";

interface ContextMenuContentProps {
  children: ReactNode;
}

const ContextMenuContent: FC<ContextMenuContentProps> = ({ children }) => {
  const { isOpen, setIsOpen } = useContextMenuContext();

  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, () => setIsOpen(false));

  return (
    isOpen && (
      <div
        ref={contextMenuRef}
        className="absolute top-8 w-full rounded-md bg-zinc-900 border border-zinc-700 z-50 shadow left-0 right-0"
      >
        {children}
      </div>
    )
  );
};

export default ContextMenuContent;
