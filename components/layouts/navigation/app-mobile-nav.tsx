"use client";

import { MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { navigationConfig } from "@/configs/navigation";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AppMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <MenuIcon className="size-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[60svh] p-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>Navigation links</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-base"
            >
              Home
            </Link>
            {navigationConfig.map((item, index) =>
              item.href && !item.disabled ? (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base"
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
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
