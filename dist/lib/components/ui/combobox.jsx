"use client";
import * as React from "react";
import { useIsMobile } from "../../hooks/use-mobile";
import { Button } from "../../components/ui/form/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "../../components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
const statuses = [
    {
        value: "backlog",
        label: "Backlog",
    },
    {
        value: "todo",
        label: "Todo",
    },
    {
        value: "in progress",
        label: "In Progress",
    },
    {
        value: "done",
        label: "Done",
    },
    {
        value: "canceled",
        label: "Canceled",
    },
];
export function ComboBox({ emptyState }) {
    const [open, setOpen] = React.useState(false);
    const isMobile = useIsMobile();
    const [selectedStatus, setSelectedStatus] = React.useState(null);
    if (isMobile) {
        return (<Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} emptyState={emptyState}/>
          </div>
        </DrawerContent>
      </Drawer>);
    }
    return (<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} emptyState={emptyState}/>
      </PopoverContent>
    </Popover>);
}
function StatusList({ setOpen, setSelectedStatus, emptyState, }) {
    return (<Command>
      <CommandInput placeholder="Filter status..."/>
      <CommandList>
        {emptyState && <CommandEmpty>{emptyState}</CommandEmpty>}
        {!emptyState && <CommandEmpty>No results found.</CommandEmpty>}
        <CommandGroup>
          {statuses.map((status) => (<CommandItem key={status.value} value={status.value} onSelect={(value) => {
                setSelectedStatus(statuses.find((priority) => priority.value === value) || null);
                setOpen(false);
            }}>
              {status.label}
            </CommandItem>))}
        </CommandGroup>
      </CommandList>
    </Command>);
}
