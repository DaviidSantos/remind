import { FC, ReactNode } from "react";
import { useExplorerContext } from "../../context/ExplorerContext";

interface ExplorerContainerProps {
  children: ReactNode;
}

const ExplorerContainer: FC<ExplorerContainerProps> = ({ children }) => {
  const { isOpen } = useExplorerContext();

  return (
    isOpen && (
      <div className="w-80 bg-zinc-900 border-r border-r-zinc-700 h-full px-5 flex flex-col relative">
        {children}
      </div>
    )
  );
};

export default ExplorerContainer;
