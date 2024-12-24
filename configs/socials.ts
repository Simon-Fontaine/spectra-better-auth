import { TwitterLogo } from "@/components/icons";

type SocialsItem = {
  name: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  disabled: boolean;
};

export const socialsConfig: SocialsItem[] = [
  {
    name: "Twitter",
    url: "https://x.com/SpectraOW2",
    icon: TwitterLogo,
    disabled: false,
  },
];

export type SocialsConfig = typeof socialsConfig;
