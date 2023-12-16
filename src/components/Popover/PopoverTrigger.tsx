import { FC, ReactNode } from "react";
import { usePopoverContext } from "../../context/PopoverContext";

interface PopoverTriggerProps {
  children: ReactNode;
}

const PopoverTrigger: FC<PopoverTriggerProps> = ({ children }) => {
  const { isOpen, setIsOpen } = usePopoverContext();

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return <button onClick={togglePopover}>{children}</button>;
};

export default PopoverTrigger;
