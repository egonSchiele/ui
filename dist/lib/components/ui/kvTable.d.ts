import React from "react";
export type KVTableItem = {
    key: string;
    value: string | number | React.ReactNode;
};
export declare function KVTable({ title, description, items, className, layout, }: {
    title?: string;
    description?: string;
    items: KVTableItem[];
    className?: string;
    layout?: "default" | "tight";
}): React.JSX.Element;
