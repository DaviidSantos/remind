import { FC, ReactNode } from "react";
import { usePopoverContext } from "../../context/PopoverContext";

interface PopoverTriggerProps {
  children: ReactNode;
}

const PopoverTrigger: FC<PopoverTriggerProps> = ({ children }) => {
  const { setIsOpen } = usePopoverContext();
  
  return <button onClick={() => setIsOpen(true)}>{children}</button>;
};

export default PopoverTrigger;
