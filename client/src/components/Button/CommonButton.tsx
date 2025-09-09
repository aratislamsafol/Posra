import { Button } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, type ReactNode } from "react";
type CommonButton = {
  activeColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  borderRounded?: string;
  bgColor?: string;
  textHover?: string;
  textSize?:string;
  fontWeight?:string;
  children: ReactNode;
  style: string;
  activeBgColor: string;
};
const CommonButton = ({
  activeColor,
  textColor,
  textHover,
  hoverBgColor,
  borderRounded,
  bgColor,
  textSize,
  fontWeight,
  children,
  style,
  activeBgColor
}: CommonButton) => {
  return (
    <Button as={Fragment}>
      {({ hover, active }) => (
        <button
          className={clsx(
            `${borderRounded} ${textSize} ${fontWeight} ${style} transition-all cursor-pointer`,
            !hover && !active && textColor && bgColor,
            hover && !active && hoverBgColor && textHover && `${hoverBgColor} ${textHover}`,
            active && activeColor && activeBgColor && `${activeColor} ${activeBgColor}`

          )}
        >
          {children}
        </button>
      )}
    </Button>
  );
};

export default CommonButton;
