"use client";

import * as React from "react";
import { defaultFilter } from "cmdk";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/form/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";

export type ComboBoxItem<T = unknown> = {
  key: string;
  label: string;
  metadata?: T;
  group?: string;
  disabled?: boolean;
};
type SelectionProps =
  | { selectedKey: string | null; defaultSelectedKey?: never }
  | { selectedKey?: never; defaultSelectedKey?: string | null };
export type ComboBoxProps<T = unknown> = SelectionProps & {
  items: ComboBoxItem<T>[];
  placeholder?: string;
  "aria-label"?: string;
  emptyState?: React.ReactNode;
  loading?: boolean;
  loadingState?: React.ReactNode;
  disabled?: boolean;
  onSelect?: (item: ComboBoxItem<T>) => void;
  onSelectedKeyChange?: (key: string | null) => void;
  renderItem?: (item: ComboBoxItem<T>) => React.ReactNode;
  renderSelected?: (item: ComboBoxItem<T>) => React.ReactNode;
  showChevron?: boolean;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
  modal?: boolean;
};

type ItemListProps<T> = {
  selectedKey: string | null;
  items: ComboBoxItem<T>[];
  placeholder: string;
  emptyState?: React.ReactNode;
  loading?: boolean;
  loadingState?: React.ReactNode;
  renderItem?: (item: ComboBoxItem<T>) => React.ReactNode;
  onSelect: (item: ComboBoxItem<T>) => void;
};
type ItemGroup<T> = { heading: string | undefined; items: ComboBoxItem<T>[] };

function triggerLabel<T>({
  item,
  label,
}: {
  item: ComboBoxItem<T> | undefined;
  label: string | undefined;
}): string | undefined {
  if (item === undefined) {
    return label;
  }
  return label ? `${label}: ${item.label}` : item.label;
}

function SelectedContent<T>({
  item,
  placeholder,
  renderSelected,
}: {
  item: ComboBoxItem<T> | undefined;
  placeholder: string;
  renderSelected?: (item: ComboBoxItem<T>) => React.ReactNode;
}): React.ReactNode {
  if (item === undefined) {
    return placeholder;
  }
  return renderSelected ? renderSelected(item) : item.label;
}

function groupItems<T>(items: ComboBoxItem<T>[]): ItemGroup<T>[] {
  const groups: ItemGroup<T>[] = [];
  for (const item of items) {
    const existing: ItemGroup<T> | undefined = groups.find(
      (group: ItemGroup<T>): boolean => group.heading === item.group,
    );
    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ heading: item.group, items: [item] });
    }
  }
  return groups;
}

function ItemList<T>({
  selectedKey,
  items,
  placeholder,
  emptyState,
  loading,
  loadingState,
  renderItem,
  onSelect,
}: ItemListProps<T>): React.JSX.Element {
  return (
    <Command
      defaultValue={selectedKey ?? undefined}
      filter={(_value: string, search: string, keywords?: string[]): number =>
        defaultFilter(keywords?.join(" ") ?? "", search)
      }
    >
      <CommandInput
        placeholder={placeholder}
        aria-label={placeholder}
        disabled={loading}
      />
      <CommandList aria-busy={loading}>
        {loading ? (
          <div role="status" className="p-4 text-sm text-muted-foreground">
            {loadingState ?? "Loading options…"}
          </div>
        ) : (
          <>
            <CommandEmpty>{emptyState ?? "No results found."}</CommandEmpty>
            {groupItems(items).map(
              (group: ItemGroup<T>, index: number): React.JSX.Element => (
                <CommandGroup
                  key={group.heading ?? index}
                  heading={group.heading}
                >
                  {group.items.map(
                    (item: ComboBoxItem<T>): React.JSX.Element => (
                      <CommandItem
                        key={item.key}
                        value={item.key}
                        keywords={[item.label]}
                        disabled={item.disabled}
                        onSelect={(): void => onSelect(item)}
                      >
                        {renderItem ? renderItem(item) : item.label}
                        {item.key === selectedKey && (
                          <>
                            <CheckIcon
                              aria-hidden="true"
                              data-slot="combobox-selected"
                              className="ml-auto shrink-0"
                            />
                            <span className="sr-only">(current)</span>
                          </>
                        )}
                      </CommandItem>
                    ),
                  )}
                </CommandGroup>
              ),
            )}
          </>
        )}
      </CommandList>
    </Command>
  );
}

export function ComboBox<T = unknown>({
  items,
  placeholder = "Select an item...",
  selectedKey,
  defaultSelectedKey = null,
  onSelect,
  onSelectedKeyChange,
  disabled,
  className,
  buttonClassName,
  contentClassName,
  modal = false,
  renderSelected,
  showChevron = false,
  "aria-label": ariaLabel,
  ...listProps
}: ComboBoxProps<T>): React.JSX.Element {
  const [open, setOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(false);
  const [internalKey, setInternalKey]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = React.useState<string | null>(defaultSelectedKey);
  const isMobile: boolean = useIsMobile();
  const key: string | null =
    selectedKey !== undefined ? selectedKey : internalKey;
  const selectedItem: ComboBoxItem<T> | undefined = items.find(
    (item: ComboBoxItem<T>): boolean => item.key === key,
  );

  React.useEffect((): void => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  function select(item: ComboBoxItem<T>): void {
    if (disabled || item.disabled) {
      return;
    }
    if (selectedKey === undefined) {
      setInternalKey(item.key);
    }
    onSelectedKeyChange?.(item.key);
    onSelect?.(item);
    setOpen(false);
  }

  const trigger: React.JSX.Element = (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      aria-label={triggerLabel({ item: selectedItem, label: ariaLabel })}
      className={cn("w-[150px] justify-start", buttonClassName)}
    >
          <span className="min-w-0 flex-1 truncate text-left">
        <SelectedContent
          item={selectedItem}
          placeholder={placeholder}
          renderSelected={renderSelected}
        />
      </span>
      {showChevron && (
        <ChevronDownIcon
          aria-hidden="true"
          className="ml-auto size-4 shrink-0"
        />
      )}
    </Button>
  );
  const list: React.JSX.Element = (
    <ItemList
      {...listProps}
      items={items}
      selectedKey={key}
      placeholder={placeholder}
      onSelect={select}
    />
  );

  if (isMobile) {
    return (
      <Drawer open={open && !disabled} onOpenChange={setOpen}>
        <DrawerTrigger className={className} asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent className={cn(className, contentClassName)}>
          <DrawerTitle className="sr-only">
            {ariaLabel ?? placeholder}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Search and select an option.
          </DrawerDescription>
          <div className="mt-4 border-t">{list}</div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover open={open && !disabled} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger className={className} asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className={cn(className, contentClassName)} align="start">
        {list}
      </PopoverContent>
    </Popover>
  );
}
