import React from "react";
export function SectionHeading({ text, description, className, actions, }) {
    return (<div className="border-b border-border pb-5 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-primary">{text}</h3>
        {description && (<p className="mt-2 max-w-4xl text-sm text-secondary">{description}</p>)}
      </div>

      <div className="mt-3 flex sm:mt-0 sm:ml-4">{actions}</div>
    </div>);
}
