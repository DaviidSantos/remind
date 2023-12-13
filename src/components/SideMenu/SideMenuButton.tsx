import { FC, ReactNode } from "react";

interface SideMenuButtonProps {
  children: ReactNode;
  action: () => void;
}

const SideMenuButton: FC<SideMenuButtonProps> = ({ children, action }) => {
  return (
    <button className="p-3 hover:bg-zinc-700" onClick={action}>
      {children}
    </button>
  );
};

export default SideMenuButton;
