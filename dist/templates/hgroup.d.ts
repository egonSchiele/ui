export declare const template = "import { cn } from \"@/utils\";\nimport React from \"react\";\n\nexport type HGroup{{size:string}}Props = {\n  children: React.ReactNode;\n  className?: string;\n  [key: string]: any;\n};\n\nexport function HGroup{{size:string}}(props: HGroup{{size:string}}Props) {\n  const { children, className = \"\" } = props;\n  const sizeClass = \"{{sizeClass:string}}\";\n  return (\n    <div\n      className={cn(`flex flex-row`, sizeClass, className)}\n      {...props}\n    >\n      {children}\n    </div>\n  );\n}\n";
export type TemplateType = {
    size: string;
    sizeClass: string;
};
declare const render: (args: TemplateType) => string;
export default render;
