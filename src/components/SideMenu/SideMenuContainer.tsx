import { FC, ReactNode } from "react";

interface SideMenuContainerProps {
  children: ReactNode;
}

const SideMenuContainer: FC<SideMenuContainerProps> = ({ children }) => {
  return (
    <aside className="flex flex-col justify-between border-r border-r-zinc-700 bg-zinc-800 h-screen">
      {children}
    </aside>
  );
};

export default SideMenuContainer;
