"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { defaultFilter } from "cmdk";
import { CheckIcon } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import { Button } from "../../components/ui/form/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../components/ui/command";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger, } from "../../components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
import { cn } from "../../utils";
function groupItems(items) {
    const groups = [];
    for (const item of items) {
        const existing = groups.find((group) => group.heading === item.group);
        if (existing) {
            existing.items.push(item);
        }
        else {
            groups.push({ heading: item.group, items: [item] });
        }
    }
    return groups;
}
function ItemList({ selectedKey, items, placeholder, emptyState, loading, loadingState, renderItem, onSelect, }) {
    return (<Command defaultValue={selectedKey !== null && selectedKey !== void 0 ? selectedKey : undefined} filter={(_value, search, keywords) => { var _a; return defaultFilter((_a = keywords === null || keywords === void 0 ? void 0 : keywords.join(" ")) !== null && _a !== void 0 ? _a : "", search); }}>
      <CommandInput placeholder={placeholder} aria-label={placeholder} disabled={loading}/>
      <CommandList aria-busy={loading}>
        {loading ? (<div role="status" className="p-4 text-sm text-muted-foreground">
            {loadingState !== null && loadingState !== void 0 ? loadingState : "Loading options…"}
          </div>) : (<>
            <CommandEmpty>{emptyState !== null && emptyState !== void 0 ? emptyState : "No results found."}</CommandEmpty>
            {groupItems(items).map((group, index) => {
                var _a;
                return (<CommandGroup key={(_a = group.heading) !== null && _a !== void 0 ? _a : index} heading={group.heading}>
                  {group.items.map((item) => (<CommandItem key={item.key} value={item.key} keywords={[item.label]} disabled={item.disabled} onSelect={() => onSelect(item)}>
                        {renderItem ? renderItem(item) : item.label}
                        {item.key === selectedKey && (<CheckIcon aria-hidden="true" data-slot="combobox-selected" className="ml-auto shrink-0"/>)}
                      </CommandItem>))}
                </CommandGroup>);
            })}
          </>)}
      </CommandList>
    </Command>);
}
export function ComboBox(_a) {
    var _b;
    var { items, placeholder = "Select an item...", selectedKey, defaultSelectedKey = null, onSelect, onSelectedKeyChange, disabled, className, buttonClassName, contentClassName, modal = false, "aria-label": ariaLabel } = _a, listProps = __rest(_a, ["items", "placeholder", "selectedKey", "defaultSelectedKey", "onSelect", "onSelectedKeyChange", "disabled", "className", "buttonClassName", "contentClassName", "modal", "aria-label"]);
    const [open, setOpen] = React.useState(false);
    const [internalKey, setInternalKey] = React.useState(defaultSelectedKey);
    const isMobile = useIsMobile();
    const key = selectedKey !== undefined ? selectedKey : internalKey;
    const selectedItem = items.find((item) => item.key === key);
    React.useEffect(() => {
        if (disabled) {
            setOpen(false);
        }
    }, [disabled]);
    function select(item) {
        if (disabled || item.disabled) {
            return;
        }
        if (selectedKey === undefined) {
            setInternalKey(item.key);
        }
        onSelectedKeyChange === null || onSelectedKeyChange === void 0 ? void 0 : onSelectedKeyChange(item.key);
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(item);
        setOpen(false);
    }
    const trigger = (<Button type="button" variant="outline" disabled={disabled} aria-label={selectedItem && ariaLabel
            ? `${ariaLabel}: ${selectedItem.label}`
            : ariaLabel} className={cn("w-[150px] justify-start", buttonClassName)}>
      {(_b = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.label) !== null && _b !== void 0 ? _b : placeholder}
    </Button>);
    const list = (<ItemList {...listProps} items={items} selectedKey={key} placeholder={placeholder} onSelect={select}/>);
    if (isMobile) {
        return (<Drawer open={open && !disabled} onOpenChange={setOpen}>
        <DrawerTrigger className={className} asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent className={cn(className, contentClassName)}>
          <DrawerTitle className="sr-only">
            {ariaLabel !== null && ariaLabel !== void 0 ? ariaLabel : placeholder}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Search and select an option.
          </DrawerDescription>
          <div className="mt-4 border-t">{list}</div>
        </DrawerContent>
      </Drawer>);
    }
    return (<Popover open={open && !disabled} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger className={className} asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className={cn(className, contentClassName)} align="start">
        {list}
      </PopoverContent>
    </Popover>);
}
