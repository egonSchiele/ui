import { cn } from "../../utils";
import React from "react";
export function KVTable({ title, description, items, className = "", layout = "default", }) {
    return (<div className={cn(className)}>
      <div className="px-4 sm:px-0">
        {title && (<h3 className="text-base/7 font-semibold text-primary">{title}</h3>)}
        {description && (<p className="mt-1 max-w-2xl text-sm/6 text-primary/80">
            {description}
          </p>)}
      </div>
      <div className="mt-6 border-t border-border">
        <dl className="divide-y divide-border">
          {items.map((item) => (<div key={item.key} className={cn("px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0", layout === "tight" ? "py-2" : "py-6")}>
              <dt className="text-sm/6 font-medium text-primary">{item.key}</dt>
              <dd className="mt-1 text-sm/6 text-primary/90 sm:col-span-2 sm:mt-0">
                {item.value}
              </dd>
            </div>))}
        </dl>
      </div>
    </div>);
}
