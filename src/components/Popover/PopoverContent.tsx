import { FC, ReactNode, useRef } from "react";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { usePopoverContext } from "../../context/PopoverContext";

interface PopoverContentProps {
  children: ReactNode;
}

const PopoverContent: FC<PopoverContentProps> = ({ children }) => {
  const { isOpen, setIsOpen } = usePopoverContext();
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(popoverRef, () => setIsOpen(false));

  return (
    <>
      {isOpen && (
        <div
          ref={popoverRef}
          className="rounded-md bg-zinc-900 border border-zinc-700 absolute top-10 p-3 shadow left-0 right-0 w-full z-50"
        >
          {children}
        </div>
      )}
    </>
  );
};

export default PopoverContent;
