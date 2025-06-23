import React from "react";
import { KVTable, KVTableItem } from "@/components/ui/kvTable";
import { Button } from "@/components/ui/form/button";

const fields: KVTableItem[] = [
  {
    key: "name",
    value: "adit",
  },
  { key: "occupation", value: "developer" },
  {
    key: "alert button",
    value: <Button onClick={() => alert("Button clicked!")}>Click Me</Button>,
  },
] as const;

export function KVTableDemo() {
  return (
    <KVTable
      title="User Information"
      description="Details about the user"
      items={fields}
      layout="tight"
    />
  );
}
