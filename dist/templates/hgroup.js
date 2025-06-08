// THIS FILE WAS AUTO-GENERATED
// Source: templates/hgroup.mustache
// Any manual changes will be lost.
import { apply } from "typestache";
export const template = `import { cn } from "../lib/utils";
import React from "react";

export type HGroup{{size:string}}Props = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function HGroup{{size:string}}(props: HGroup{{size:string}}Props) {
  const { children, className = "" } = props;
  const sizeClass = "{{sizeClass:string}}";
  return (
    <div
      className={cn(\`flex flex-row\`, sizeClass, className)}
      {...props}
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
