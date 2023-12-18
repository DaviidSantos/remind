import { FC, ReactNode } from "react";
import { useContextMenuContext } from "../../context/ContextMenuContext";

interface ContextMenuTriggerProps {
  children: ReactNode;
}

const ContextMenuTrigger: FC<ContextMenuTriggerProps> = ({ children }) => {
  const { setIsOpen } = useContextMenuContext();

  return <button onAuxClick={() => setIsOpen(true)}>{children}</button>;
};

export default ContextMenuTrigger;
