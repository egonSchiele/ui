"use client";
import * as React from "react";
import { useIsMobile } from "../../hooks/use-mobile";
import { Button } from "../../components/ui/form/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "../../components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
export function ComboBox({ items, placeholder = "Select an item...", emptyState, onSelect, className, }) {
    const [open, setOpen] = React.useState(false);
    const isMobile = useIsMobile();
    const [selectedItem, setSelectedItem] = React.useState(null);
    const handleSelect = (item) => {
        setSelectedItem(item);
        if (item && onSelect) {
            onSelect(item);
        }
    };
    if (isMobile) {
        return (<Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedItem ? <>{selectedItem.label}</> : <>{placeholder}</>}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <ItemList items={items} placeholder={placeholder} setOpen={setOpen} setSelectedItem={handleSelect} emptyState={emptyState}/>
          </div>
        </DrawerContent>
      </Drawer>);
    }
    return (<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedItem ? <>{selectedItem.label}</> : <>{placeholder}</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <ItemList items={items} placeholder={placeholder} setOpen={setOpen} setSelectedItem={handleSelect} emptyState={emptyState}/>
      </PopoverContent>
    </Popover>);
}
function ItemList({ items, placeholder, setOpen, setSelectedItem, emptyState, }) {
    return (<Command>
      <CommandInput placeholder={placeholder}/>
      <CommandList>
        {emptyState && <CommandEmpty>{emptyState}</CommandEmpty>}
        {!emptyState && <CommandEmpty>No results found.</CommandEmpty>}
        <CommandGroup>
          {items.map((item) => (<CommandItem key={item.key} value={item.label} onSelect={(value) => {
                setSelectedItem(items.find((i) => i.label === value) || null);
                setOpen(false);
            }}>
              {item.label}
            </CommandItem>))}
        </CommandGroup>
      </CommandList>
    </Command>);
}
