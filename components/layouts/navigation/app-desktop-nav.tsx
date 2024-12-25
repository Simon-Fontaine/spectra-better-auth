"use client";

import { SpectraLogo } from "@/components/icons";
import { navigationConfig } from "@/configs/navigation";
import { siteConfig } from "@/configs/site";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppDesktopNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <SpectraLogo width={40} height={40} />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {navigationConfig.map((item, index) =>
          item.href && !item.disabled ? (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname.endsWith(item.href)
                  ? "text-foreground"
                  : "text-foreground/80"
              )}
              target={item.external ? "_blank" : undefined}
              aria-label={item.title}
            >
              <div className="flex items-center gap-1">
                {item.icon ? (
                  <item.icon className="size-4" aria-hidden="true" />
                ) : null}
                <span>{item.title}</span>
                {item.external ? <ExternalLink className="size-4" /> : null}
              </div>
            </Link>
          ) : null
        )}
      </nav>
    </div>
  );
}
