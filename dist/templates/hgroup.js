// THIS FILE WAS AUTO-GENERATED
// Source: templates/hgroup.mustache
// Any manual changes will be lost.
import { apply } from "typestache";
export const template = `import { cn } from "../../../utils.js";
import React from "react";

export type HGroup{{size:string}}Props = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroup{{size:string}}({ children, className = "", ...rest }: HGroup{{size:string}}Props) {
  const sizeClass = "{{sizeClass:string}}";
  return (
    <div
      className={cn(\`flex flex-row\`, sizeClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
`;
const render = (args) => {
    return apply(template, args);
};
export default render;
