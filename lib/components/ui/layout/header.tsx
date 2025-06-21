import React from "react";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils";

export type NavigationItem = {
  name: string;
  href: string;
  selected?: boolean;
};

export function Header({
  navigation,
  companyName,
  companyLogo,
  actions,
}: {
  navigation: NavigationItem[];
  companyName?: string;
  companyLogo?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="bg-background">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex items-center gap-x-12">
          {companyLogo && (
            <img alt="" src={companyLogo} className="h-8 w-auto" />
          )}

          {companyName && (
            <span className="text-sm/6 font-semibold text-primary/80 pb-xl -mt-1.5">
              {companyName}
            </span>
          )}
          <div className="flex gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm/6 font-semibold",
                  item.selected &&
                    "border-b-2 border-primary pb-1 text-primary",
                  !item.selected && "text-primary/80 hover:text-primary"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {actions && <div className="flex items-center gap-x-4">{actions}</div>}
      </nav>
    </header>
  );
}
