import { FC, ReactNode } from "react";

interface ExplorerOptionProps {
  children: ReactNode;
}

const ExplorerOption: FC<ExplorerOptionProps> = ({ children }) => {
  return (
    <button className="p-1 rounded-full hover:bg-zinc-700">
      {children}
    </button>
  );
};

export default ExplorerOption;
