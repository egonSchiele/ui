import * as React from "react";
import {
  SegmentedControl,
  type SegmentedControlOption,
  type SegmentedControlProps,
} from "@/components/ui/form/segmented-control";

type SeedMode = "random" | "fixed";
const options: SegmentedControlOption<SeedMode>[] = [
  { value: "random", label: "Random" },
  { value: "fixed", label: "Fixed" },
];

// The callback must accept the same union as the options, without a guard or cast.
export function TypedControlledSegments(): React.JSX.Element {
  const [mode, setMode]: [
    SeedMode,
    React.Dispatch<React.SetStateAction<SeedMode>>,
  ] = React.useState<SeedMode>("random");
  return (
    <SegmentedControl options={options} value={mode} onValueChange={setMode} />
  );
}

export const uncontrolled: SegmentedControlProps<SeedMode> = {
  options,
  defaultValue: "fixed",
  onValueChange: (mode: SeedMode): void => {
    void mode;
  },
};

export const invalid: SegmentedControlProps<SeedMode> = {
  options,
  // @ts-expect-error The generic rejects values outside the declared options union.
  defaultValue: "other",
};

export const defaultString: SegmentedControlProps = {
  options: [{ value: "custom", label: "Custom" }],
  defaultValue: "custom",
};

export const inferredTypo: React.JSX.Element = (
  // @ts-expect-error The default value must be one of the options.
  <SegmentedControl options={options} defaultValue="other" />
);

export function InferredControlledTypo(): React.JSX.Element {
  return (
    <SegmentedControl
      options={options}
      // @ts-expect-error The controlled value must be one of the options.
      value="randm"
      onValueChange={(mode): void => {
        void mode;
      }}
    />
  );
}
