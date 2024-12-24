import Image from "next/image";

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
