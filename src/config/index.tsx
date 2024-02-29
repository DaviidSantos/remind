import { ReactElement } from "react";
import { AiOutlineFileMarkdown } from "react-icons/ai";
import { PiClockCounterClockwiseLight } from "react-icons/pi";

interface Navigation {
  href: string;
  tip: string;
  value: string;
  icon: ReactElement;
}

export const APP_NAVIGATION: Navigation[] = [
  {
    href: "/",
    tip: "Anotações",
    value: "anotacoes" as const,
    icon: <AiOutlineFileMarkdown className="text-zinc-100 h-4" />,
  },
  {
    href: "/cartoes",
    tip: "Cartões",
    value: "cartoes",
    icon: <PiClockCounterClockwiseLight className="text-zinc-100 h-4" />,
  },
];
