import { FC, ReactNode } from "react";

interface ExplorerOptionsProps {
  children: ReactNode;
}

const ExplorerOptions: FC<ExplorerOptionsProps> = ({ children }) => {
  return (
    <div className="w-full relative py-1 border-b border-b-zinc-700 flex justify-evenly">
      {children}
    </div>
  );
};

export default ExplorerOptions;
