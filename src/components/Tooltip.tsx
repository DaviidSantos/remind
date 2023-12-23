import { FC, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  tooltip: string;
}
const Tooltip: FC<TooltipProps> = ({ children, tooltip }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition z-50 absolute rounded-md text-zinc-200 bg-zinc-900 border border-zinc-700 text-xs font-medium p-1.5 top-full mt-2 w-max">
        {tooltip}
      </span>
    </div>
  );
};

export default Tooltip;
