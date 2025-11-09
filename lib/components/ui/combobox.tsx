"use client";

import * as React from "react";

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
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";

export type ComboBoxItem<T = any> = {
  key: string;
  label: string;
  metadata?: T;
};

export type ComboBoxProps<T = any> = {
  items: ComboBoxItem<T>[];
  placeholder?: string;
  emptyState?: React.ReactNode;
  onSelect?: (item: ComboBoxItem<T>) => void;
  className?: string;
  buttonClassName?: string;
};

export function ComboBox<T = any>({
  items,
  placeholder = "Select an item...",
  emptyState,
  onSelect,
  className,
  buttonClassName,
}: ComboBoxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const [selectedItem, setSelectedItem] = React.useState<ComboBoxItem | null>(
    null
  );

  const handleSelect = (item: ComboBoxItem | null) => {
    setSelectedItem(item);
    if (item && onSelect) {
      onSelect(item);
    }
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen} >
        <DrawerTrigger className={className} asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedItem ? <>{selectedItem.label}</> : <>{placeholder}</>}
          </Button>
        </DrawerTrigger>
        <DrawerContent className={className}>
          <div className="mt-4 border-t">
            <ItemList
              items={items}
              placeholder={placeholder}
              setOpen={setOpen}
              setSelectedItem={handleSelect}
              emptyState={emptyState}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={className} asChild>
        <Button variant="outline" className={clsx("w-[150px] justify-start", buttonClassName)}>
          {selectedItem ? <>{selectedItem.label}</> : <>{placeholder}</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={className} align="start">
        <ItemList
          items={items}
          placeholder={placeholder}
          setOpen={setOpen}
          setSelectedItem={handleSelect}
          emptyState={emptyState}
        />
      </PopoverContent>
    </Popover>
  );
}

function ItemList({
  items,
  placeholder,
  setOpen,
  setSelectedItem,
  emptyState,
}: {
  items: ComboBoxItem[];
  placeholder: string;
  setOpen: (open: boolean) => void;
  setSelectedItem: (item: ComboBoxItem | null) => void;
  emptyState?: React.ReactNode;
}) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        {emptyState && <CommandEmpty>{emptyState}</CommandEmpty>}
        {!emptyState && <CommandEmpty>No results found.</CommandEmpty>}
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.key}
              value={item.label}
              onSelect={(value) => {
                setSelectedItem(items.find((i) => i.label === value) || null);
                setOpen(false);
              }}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
