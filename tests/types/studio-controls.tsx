import * as React from "react";
import {
  ComboBox,
  type ComboBoxItem,
  type ComboBoxProps,
  LabeledSlider,
  type LabeledSliderProps,
  NumberField,
  type NumberFieldProps,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/index";

type Metadata = { alias: string };

export const numberProps: NumberFieldProps = {
  defaultValue: 4,
  density: "compact",
  showSteppers: false,
  invalidBlur: "restore",
};
export const sliderProps: LabeledSliderProps = {
  label: "Steps",
  defaultValue: null,
  placeholderValue: 4,
  min: 1,
  max: 50,
  density: "compact",
  invalidBlur: "restore",
};
export const pickerProps: ComboBoxProps<Metadata> = {
  items: [
    { key: "model", label: "Full model name", metadata: { alias: "Model" } },
  ],
  renderSelected: (item: ComboBoxItem<Metadata>): React.ReactNode =>
    item.metadata?.alias,
  showChevron: true,
};

// @ts-expect-error A controlled field cannot also have a default value.
export const invalidControlledNumber: NumberFieldProps = {
  value: 4,
  defaultValue: 2,
  onChange: (): void => undefined,
};

export const invalidPolicy: NumberFieldProps = {
  // @ts-expect-error The invalid blur policy is a closed union.
  invalidBlur: "discard",
};

export function PublicSheetParts(): React.JSX.Element {
  return (
    <Sheet>
      <SheetTrigger>Open controls</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="pr-12">
          <SheetTitle>Controls</SheetTitle>
          <SheetDescription>Adjust the values.</SheetDescription>
        </SheetHeader>
        <NumberField {...numberProps} />
        <LabeledSlider {...sliderProps} />
        <ComboBox {...pickerProps} />
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
