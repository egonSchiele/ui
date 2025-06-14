export declare const template = "import { cn } from \"../../../utils.js\";\nimport React from \"react\";\n\nexport type VGroup{{size:string}}Props = {\n  children: React.ReactNode;\n  className?: string;\n  [key: string]: any;\n};\n\nexport function VGroup{{size:string}}({ children, className = \"\", ...rest }: VGroup{{size:string}}Props) {\n  const sizeClass = \"{{sizeClass:string}}\";\n  return (\n    <div\n      className={cn(`flex flex-col`, sizeClass, className)}\n      {...rest}\n    >\n      {children}\n    </div>\n  );\n}\n";
export type TemplateType = {
    size: string;
    sizeClass: string;
};
declare const render: (args: TemplateType) => string;
export default render;
