// THIS FILE WAS AUTO-GENERATED
// Source: templates/vgroup.mustache
// Any manual changes will be lost.
import { apply } from "typestache";

export const template = `import { cn } from "@/utils";
import React from "react";

export type VGroup{{size:string}}Props = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export function VGroup{{size:string}}(props: VGroup{{size:string}}Props) {
  const { children, className = "" } = props;
  const sizeClass = {{sizeClass:string}};
  return (
    <div
      className={cn(\`flex flex-col items-start\`, sizeClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}
`;

export type TemplateType = {
  size: string;
  sizeClass: string;
};

const render = (args: TemplateType) => {
  return apply(template, args);
}

export default render;
    