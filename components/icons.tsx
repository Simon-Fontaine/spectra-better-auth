import type { HTMLAttributes } from "react";
import Image from "next/image";

type IconProps = HTMLAttributes<SVGElement>;

interface LogoProps {
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
}

export const SpectraLogo = ({
  width,
  height,
  className,
  onClick,
}: LogoProps) => (
  <Image
    src="/images/icon.png"
    alt="Spectra Logo"
    width={width}
    height={height}
    className={className}
    onClick={onClick}
    priority
  />
);

export const TwitterLogo = (props: IconProps) => (
  <svg viewBox="0 0 1200 1227" {...props}>
    <path
      fill="currentColor"
      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
    />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9h16.5m-16.5 6.75h16.5"
    />
  </svg>
);
