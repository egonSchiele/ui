import { CenteredLayout } from "@/components/ui/layout/centeredLayout";
import { Callout } from "@/components/ui/typography/callout";

import { PageHeading, Paragraph } from "@/index";
import React from "react";

export default function CenteredLayoutDemo() {
  return (
    <CenteredLayout className="flex flex-col gap-4">
      <PageHeading text="Centered Layout Demo" accentText="Accent Text" />
      <Callout text="This is a callout inside the centered layout." />
      <Paragraph text="This is a paragraph inside the centered layout." />
    </CenteredLayout>
  );
}
