import { FC, useEffect, useState, memo } from "react";
import classNames from "classnames";

import { SpaceProps } from "./Space.types";

import { toPixels } from "../../utils";

import Portal from "../Portal/Portal";

import Style from "./Space.module.sass";

const defaultSize = { width: 100, height: 100 };

const makeProperCoord = (
  point: number,
  axisSize: number,
  axisLength: number
) => {
  if (point - axisSize / 2 < 0) {
    return axisSize / 2;
  }
  if (point + axisSize / 2 > axisLength) {
    return axisLength - axisSize / 2;
  }

  return point;
};

const toCenter = (
  coords: { x: number; y: number },
  size: { width: number; height: number }
) => ({ x: coords.x - size.width / 2, y: coords.y - size.height / 2 });

const Space: FC<SpaceProps> = ({
  className = "",
  color,
  children,
  size = defaultSize,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const viewport = { width: window.innerWidth, height: window.innerHeight };

    const handleMove = (e: MouseEvent) => {
      const coords = { x: e.clientX, y: e.clientY };

      const properCoord = {
        x: makeProperCoord(coords.x, size.width, viewport.width),
        y: makeProperCoord(coords.y, size.height, viewport.height),
      };

      setPosition(toCenter(properCoord, size));
    };

    document.addEventListener("mousemove", handleMove);

    return () => document.removeEventListener("mousemove", handleMove);
  }, [size]);

  return (
    <div
      className={classNames(Style.space, className)}
      style={{ backgroundColor: color }}>
      <div
        style={{
          transform: `translate3d(${toPixels(position.x)}, ${toPixels(
            position.y
          )}, 1px)`,
          width: toPixels(size.width),
          height: toPixels(size.height),
        }}
        className={Style.movingObject}>
        {children}
      </div>
      <Portal position={{ x: 400, y: 300 }} />
      <Portal position={{ x: 300, y: 500 }} isNegative />
    </div>
  );
};

export default memo(Space);
