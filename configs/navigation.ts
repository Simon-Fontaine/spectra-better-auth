import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type NavigationItem = {
  title: string;
  href: string;
  disabled: boolean;
  external: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const navigationConfig: NavigationItem[] = [
  {
    title: "Roster",
    href: "/roster",
    disabled: false,
    external: false,
  },
  {
    title: "Calendar",
    href: "/calendar",
    disabled: false,
    external: false,
  },
  {
    title: "News",
    href: "/news",
    disabled: false,
    external: false,
  },
  {
    title: "Roster Reveal",
    href: "https://www.youtube.com/watch?v=Ji4bltE3nus",
    disabled: false,
    external: true,
  },
];

export type NavigationConfig = typeof navigationConfig;
