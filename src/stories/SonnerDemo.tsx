import React from "react";

import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/form/button";

export default function SonnerDemo() {
  return (
    <>
      <Toaster />

      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    </>
  );
}
