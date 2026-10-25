import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "egon-ui";
import "../../globals.css";

const meta = {
  title: "Examples/Button states",
  component: Button,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

function PendingActions(): React.JSX.Element {
  const [pending, setPending] = React.useState<boolean>(false);
  const [activations, setActivations] = React.useState<number>(0);
  const activate = (): void =>
    setActivations((value: number): number => value + 1);
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={(): void => setPending((value: boolean): boolean => !value)}
      >
        Toggle pending
      </Button>
      <Button pending={pending} pendingLabel="Saving…" onClick={activate}>
        Save
      </Button>
      <Button pending={pending} onClick={activate}>
        Keep label
      </Button>
      <Button pending={pending} disabled onClick={activate}>
        Unavailable
      </Button>
      <Button
        href="#link-target"
        pending={pending}
        pendingLabel="Opening…"
        onClick={activate}
      >
        Open link
      </Button>
      <Button asChild pending={pending} pendingLabel="Composing…">
        <a
          href="#child-target"
          tabIndex={0}
          aria-busy={false}
          onClick={activate}
        >
          Composed link
        </a>
      </Button>
      <output>Activations: {activations}</output>
    </div>
  );
}
// The button becomes pending from its own click, as a submit action does.
function SelfPendingAction(): React.JSX.Element {
  const [pending, setPending] = React.useState<boolean>(false);
  const [activations, setActivations] = React.useState<number>(0);
  return (
    <div className="flex flex-col gap-3">
      <Button
        pending={pending}
        pendingLabel="Queuing…"
        onClick={(): void => {
          setActivations((value: number): number => value + 1);
          setPending(true);
        }}
      >
        Queue
      </Button>
      <Button variant="outline" onClick={(): void => setPending(false)}>
        Finish
      </Button>
      <output>Queued: {activations}</output>
    </div>
  );
}
export const SelfPendingActionExample: Story = {
  render: (): React.JSX.Element => <SelfPendingAction />,
};

export const PendingActionsExample: Story = {
  render: (): React.JSX.Element => <PendingActions />,
};
