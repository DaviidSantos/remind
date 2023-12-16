import { FC, ReactNode } from "react";
import { PopoverContextProvider } from "../../context/PopoverContext";

interface PopoverProps {
  children: ReactNode;
}

const Popover: FC<PopoverProps> = ({ children }) => {
  return <PopoverContextProvider>{children}</PopoverContextProvider>;
};

export default Popover;
