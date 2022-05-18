import { FC } from "react";

import classNames from "classnames";

import { PortalProps } from "./Portal.types";

import { toPixels } from "../../utils";

import Style from "./Portal.module.sass";

const Portal: FC<PortalProps> = ({ isNegative = false, position }) => {
  return (
    <div
      className={classNames(Style.portal, { [Style.negative]: isNegative })}
      style={{
        top: toPixels(position.y),
        left: toPixels(position.x),
      }}
    />
  );
};

export default Portal;
