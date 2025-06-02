import { CenteredLayout } from "@/components/ui/layout/centeredLayout";
import { Callout } from "@/components/ui/typography/callout";

import { PageHeading, Paragraph } from "@/index";
import React from "react";

export default function CenteredLayoutDemo() {
  return (
    <CenteredLayout className="flex flex-col gap-4">
      <PageHeading accentText="accent">This is a heading</PageHeading>
      <Callout>
        This is a callout that draws attention to important information. It can
        be used to highlight key points, warnings, or special notes that the
        reader should not miss.
      </Callout>
      <Paragraph>
        This is a paragraph that provides additional information about the
        content of the page. It can be used to explain concepts, provide
        context, or simply add more detail.
      </Paragraph>
    </CenteredLayout>
  );
}
