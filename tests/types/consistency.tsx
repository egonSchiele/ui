import React from "react";
import {
  Banner,
  Button,
  HelperText,
  SectionHeading,
  SegmentedControl,
  type SectionHeadingProps,
  type ButtonProps,
} from "@/index";

export function PublicConsistencyPrimitives(): React.JSX.Element {
  const headingRef: React.RefObject<HTMLHeadingElement | null> =
    React.useRef<HTMLHeadingElement>(null);
  return (
    <section aria-labelledby="settings-heading">
      <SectionHeading
        variant="compact"
        level="h2"
        headingId="settings-heading"
        headingRef={headingRef}
        tabIndex={-1}
      >
        Settings
      </SectionHeading>
      <HelperText id="settings-help">Choose your settings.</HelperText>
      <SegmentedControl
        fullWidth
        defaultValue="basic"
        options={[{ value: "basic", label: "Basic" }]}
        aria-describedby="settings-help"
      />
      <Button size="icon-sm" aria-label="Save" pending pendingLabel="Saving" />
      <Banner style="error" role="alert" aria-label="Generation error">
        <p>Generation failed.</p>
        <Button>Retry</Button>
      </Banner>
    </section>
  );
}
export const invalidHeading: SectionHeadingProps = {
  children: "Title",
  // @ts-expect-error Heading semantics are restricted to section levels.
  level: "h1",
};
export const invalidSize: ButtonProps = {
  // @ts-expect-error Button sizes form a closed union.
  size: "tiny",
};
