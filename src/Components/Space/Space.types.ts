import { ReactElement } from "react";

export interface SpaceProps {
  className?: string;
  color: "black" | "white";
  children?: ReactElement;
  size?: { width: number; height: number };
}
