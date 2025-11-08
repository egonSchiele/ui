This repo contains React components you can use for building UI.

## Components

### Form Components

#### Button

A versatile button component with multiple style variants and sizes.

```jsx
<Button onClick={() => alert('Clicked!')}>Click Me</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small Button</Button>
```

Properties:
- `onClick`: Function to call when the button is clicked
- `children`: The content inside the button
- `variant`: Style variant: `default | destructive | outline | secondary | ghost | link`
- `size`: Size variant: `default | sm | lg | icon`
- `asChild`: If true, renders as a Slot component for composition
- `disabled`: Disables the button

#### Input

A text input field component with validation support.

```jsx
<Input type="text" placeholder="Enter your name" />
<Input type="number" />
```

Properties:
- `type`: Input type (text, number, email, password, etc.)
- `placeholder`: Placeholder text
- `value`: Controlled input value
- `onChange`: Change event handler
- `disabled`: Disables the input
- `className`: Additional CSS classes

#### Textarea

A multi-line text input component with auto-resizing.

```jsx
<Textarea placeholder="Enter your message" />
<Textarea rows={5} />
```

Properties:
- `placeholder`: Placeholder text
- `value`: Controlled textarea value
- `onChange`: Change event handler
- `rows`: Number of visible text lines
- `disabled`: Disables the textarea
- `className`: Additional CSS classes

#### Label

A form label component that pairs with form inputs.

```jsx
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

Properties:
- `htmlFor`: ID of the input element this label is associated with
- `children`: Label text content
- `className`: Additional CSS classes

#### Switch

A toggle switch component for binary choices.

```jsx
<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
```

Properties:
- `checked`: Controlled checked state
- `defaultChecked`: Default checked state for uncontrolled usage
- `onCheckedChange`: Callback when the switch state changes
- `required`: Makes the switch required
- `disabled`: Disables the switch

#### LabeledSwitch

A switch component with an integrated label.

```jsx
<LabeledSwitch
  id="notifications"
  checked={enabled}
  onCheckedChange={setEnabled}
  label="Enable notifications"
/>
```

Properties:
- `id`: Unique identifier for the switch
- `checked`: Controlled checked state
- `onCheckedChange`: Callback when the switch state changes
- `label`: Label text
- `className`: Additional CSS classes

#### Select

A dropdown select component with searchable options.

```jsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

Sub-components:
- `SelectTrigger`: The button that opens the dropdown
- `SelectValue`: Displays the selected value
- `SelectContent`: Container for the dropdown options
- `SelectItem`: Individual selectable option
- `SelectLabel`: Label for option groups
- `SelectSeparator`: Visual separator between options
- `SelectGroup`: Groups related options
- `SelectScrollUpButton`: Scroll up button for long lists
- `SelectScrollDownButton`: Scroll down button for long lists

#### SimpleForm

A comprehensive form builder component that handles multiple field types.

```jsx
<SimpleForm
  fields={[
    { name: "username", label: "Username", type: "input", required: true },
    { name: "email", label: "Email", type: "input", isNumber: false },
    { name: "role", label: "Role", type: "select", options: [
      { key: "admin", value: "admin", label: "Admin" },
      { key: "user", value: "user", label: "User" }
    ]},
    { name: "bio", label: "Bio", type: "textarea", rows: 4 }
  ]}
  onSubmit={(values) => console.log(values)}
  submitButtonText="Submit"
/>
```

Properties:
- `fields`: Array of form field configurations, of type `FormField[]` (see below)
- `onSubmit`: Callback with form values when submitted
- `onChange`: Callback when any field changes
- `onCancel`: Optional cancel button callback
- `submitButtonText`: Text for the submit button (default: "Submit")
- `className`: Additional CSS classes

FormField type:

```ts

export type FormFieldType = "input" | "select" | "textarea" | "checkbox";
export type FormFieldValue = string | number | boolean;

export type SelectOption = {
  key: string;
  value: string;
  label: string;
};

export type FormFieldBase = {
  name: string;
  label: string;
  type: FormFieldType;
  initialValue?: FormFieldValue;
  onChange?: (value: FormFieldValue) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string; // Additional class names for styling
  validate?: (value: FormFieldValue) => string | null; // Validation function returning error message or null
  placeholder?: string; // Placeholder text for input and textarea fields
};

export type FormFieldInput = FormFieldBase & {
  type: "input";
  isNumber?: boolean; // Indicates if the input should accept numbers
};

export type FormFieldSelect = FormFieldBase & {
  type: "select";
  options: SelectOption[];
};

export type FormFieldTextarea = FormFieldBase & {
  type: "textarea";
  rows?: number; // For textarea fields
  showCharCount?: boolean; // Whether to show character count
};

export type FormFieldCheckbox = FormFieldBase & {
  type: "checkbox";
  initialValue?: boolean; // Override to use boolean for checkbox
};

export type FormField = FormFieldInput | FormFieldSelect | FormFieldTextarea | FormFieldCheckbox;
```

### Layout Components

#### Separator

A visual divider component for separating content.

```jsx
<Separator />
<Separator orientation="vertical" />
```

Properties:
- `orientation`: Direction of the separator: `horizontal | vertical` (default: horizontal)
- `decorative`: Whether the separator is purely decorative (default: true)
- `className`: Additional CSS classes

#### CenteredLayout

A container that centers content with a maximum width.

```jsx
<CenteredLayout>
  <p>This content will be centered</p>
</CenteredLayout>
```

Properties:
- `children`: Content to center
- `className`: Additional CSS classes

#### Header

A navigation header component with logo and links.

```jsx
<Header
  navigation={[
    { name: "Home", href: "/", selected: true },
    { name: "About", href: "/about" }
  ]}
  companyName="Acme Corp"
  companyLogo="/logo.png"
  actions={<Button>Sign In</Button>}
/>
```

Properties:
- `navigation`: Array of navigation items with `name`, `href`, and optional `selected` boolean
- `companyName`: Company name to display
- `companyLogo`: URL to company logo image
- `actions`: React nodes to display in the header actions area

#### VGroupXS, VGroupSM, VGroupMD, VGroupLG, VGroupXL

Vertical layout containers with predefined spacing.

```jsx
<VGroupXS>
  <div>Item 1</div>
  <div>Item 2</div>
</VGroupXS>
```

Properties:
- `children`: Child elements to layout vertically
- `className`: Additional CSS classes
- All standard div props

Variants:
- `VGroupXS`: Extra small gap
- `VGroupSM`: Small gap
- `VGroupMD`: Medium gap
- `VGroupLG`: Large gap
- `VGroupXL`: Extra large gap

#### HGroupXS, HGroupSM, HGroupMD, HGroupLG, HGroupXL

Horizontal layout containers with predefined spacing.

```jsx
<HGroupXS>
  <div>Item 1</div>
  <div>Item 2</div>
</HGroupXS>
```

Properties:
- `children`: Child elements to layout horizontally
- `className`: Additional CSS classes
- All standard div props

Variants:
- `HGroupXS`: Extra small gap
- `HGroupSM`: Small gap
- `HGroupMD`: Medium gap
- `HGroupLG`: Large gap
- `HGroupXL`: Extra large gap

### Typography Components

#### Paragraph

A styled paragraph component for body text.

```jsx
<Paragraph>This is a paragraph of text.</Paragraph>
```

Properties:
- `children`: Text or React nodes
- `className`: Additional CSS classes

#### Callout

A larger, emphasized text component for callouts.

```jsx
<Callout>This is an important message!</Callout>
```

Properties:
- `children`: Text or React nodes
- `className`: Additional CSS classes

#### PageHeading

A large page title component with optional accent text.

```jsx
<PageHeading accentText="Welcome" accentColor="text-blue-500">
  Dashboard
</PageHeading>
```

Properties:
- `children`: Main heading text
- `accentText`: Optional accent text above the heading
- `accentColor`: CSS color class for accent text (default: "text-chart-2")
- `className`: Additional CSS classes

#### PageHeading2

A page heading with optional action buttons.

```jsx
<PageHeading2 actions={<Button>New Item</Button>}>
  My Items
</PageHeading2>
```

Properties:
- `children`: Heading text
- `actions`: Optional action buttons or elements
- `className`: Additional CSS classes

#### SectionHeading

A section heading with optional description and actions.

```jsx
<SectionHeading
  description="Manage your team members"
  actions={<Button>Add Member</Button>}
>
  Team
</SectionHeading>
```

Properties:
- `children`: Heading text
- `description`: Optional description text
- `actions`: Optional action buttons or elements
- `className`: Additional CSS classes

### Dialog & Modal Components

#### Popover

A floating popover component for displaying content relative to a trigger element.

```jsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content goes here</p>
  </PopoverContent>
</Popover>
```

PopoverContent properties:
- `align`: Alignment relative to trigger: `start | center | end` (default: center)
- `sideOffset`: Distance from the trigger in pixels (default: 4)
- `side`: Side to display: `top | right | bottom | left`
- `className`: Additional CSS classes

Sub-components:
- `PopoverTrigger`: Element that opens the popover
- `PopoverContent`: Container for popover content

#### Dialog

A modal dialog component for displaying content in an overlay.

```jsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text</DialogDescription>
    </DialogHeader>
    <p>Dialog content goes here</p>
    <DialogFooter>
      <Button>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Sub-components:
- `DialogTrigger`: Button or element that opens the dialog
- `DialogContent`: Container for dialog content
- `DialogHeader`: Header section of the dialog
- `DialogTitle`: Dialog title
- `DialogDescription`: Dialog description text
- `DialogFooter`: Footer section for action buttons
- `DialogClose`: Button that closes the dialog
- `DialogOverlay`: Backdrop overlay
- `DialogPortal`: Portal for rendering outside the DOM tree

#### Sheet

A slide-out panel component (drawer/sidebar).

```jsx
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet description</SheetDescription>
    </SheetHeader>
    <p>Sheet content</p>
    <SheetFooter>
      <Button>Close</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

Properties for SheetContent:
- `side`: Side to slide from: `top | right | bottom | left` (default: right)

Sub-components:
- `SheetTrigger`: Element that opens the sheet
- `SheetContent`: Container for sheet content
- `SheetHeader`: Header section
- `SheetTitle`: Sheet title
- `SheetDescription`: Sheet description
- `SheetFooter`: Footer section
- `SheetClose`: Close button
- `SheetOverlay`: Backdrop overlay
- `SheetPortal`: Portal for rendering

#### Drawer

A bottom drawer component that slides up from the bottom of the screen (mobile-optimized).

```jsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>Drawer description</DrawerDescription>
    </DrawerHeader>
    <p>Drawer content</p>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

Drawer properties:
- `shouldScaleBackground`: Whether to scale the background when open (default: true)

Sub-components:
- `DrawerTrigger`: Element that opens the drawer
- `DrawerContent`: Container for drawer content
- `DrawerHeader`: Header section
- `DrawerTitle`: Drawer title
- `DrawerDescription`: Drawer description
- `DrawerFooter`: Footer section for action buttons
- `DrawerClose`: Close button
- `DrawerOverlay`: Backdrop overlay
- `DrawerPortal`: Portal for rendering

### Navigation Components

#### Command

A command palette component for searchable commands.

```jsx
<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

Sub-components:
- `CommandDialog`: Dialog wrapper for the command palette
- `CommandInput`: Search input field
- `CommandList`: Container for command items
- `CommandEmpty`: Message when no results found
- `CommandGroup`: Groups related commands
- `CommandItem`: Individual command item
- `CommandSeparator`: Visual separator
- `CommandShortcut`: Keyboard shortcut display

#### Combobox

A responsive combobox component that combines a searchable command list with a popover (desktop) or drawer (mobile).

```jsx
<ComboBox emptyState={<p>No results found</p>} />
```

Properties:
- `emptyState`: Optional custom React node to display when search returns no results

The component provides:
- Built-in status selection with predefined options (Backlog, Todo, In Progress, Done, Canceled)
- Automatic responsive behavior (popover on desktop, drawer on mobile)
- Searchable/filterable command list
- Keyboard navigation support

Note: This is a pre-configured component. For custom options, you'll need to create your own implementation using the Command, Popover, and Drawer components.

#### Menubar

A horizontal menu bar with dropdown menus.

```jsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New File</MenubarItem>
      <MenubarSeparator />
      <MenubarItem variant="destructive">Delete</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

Sub-components:
- `MenubarMenu`: Individual menu
- `MenubarTrigger`: Button that opens the menu
- `MenubarContent`: Container for menu items
- `MenubarItem`: Individual menu item
- `MenubarCheckboxItem`: Checkbox menu item
- `MenubarRadioGroup`: Radio group container
- `MenubarRadioItem`: Radio menu item
- `MenubarLabel`: Label for menu sections
- `MenubarSeparator`: Visual separator
- `MenubarShortcut`: Keyboard shortcut display
- `MenubarSub`: Submenu container
- `MenubarSubTrigger`: Opens a submenu
- `MenubarSubContent`: Submenu content

MenubarItem properties:
- `variant`: Style variant: `default | destructive`
- `inset`: Adds left padding for alignment

#### Tabs

A tabbed interface component.

```jsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content for tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Content for tab 2
  </TabsContent>
</Tabs>
```

Sub-components:
- `TabsList`: Container for tab triggers
- `TabsTrigger`: Individual tab button
- `TabsContent`: Content panel for each tab

#### Pagination

A pagination component for navigating through pages.

```jsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/2" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

Sub-components:
- `PaginationContent`: Container for pagination items
- `PaginationItem`: Wrapper for each pagination element
- `PaginationLink`: Link to a specific page
- `PaginationPrevious`: Previous page link
- `PaginationNext`: Next page link
- `PaginationEllipsis`: Ellipsis for skipped pages

PaginationLink properties:
- `isActive`: Highlights the current page
- `size`: Size variant: `default | icon`

#### Sidebar

A comprehensive sidebar navigation component with collapsible state.

```jsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <h2>My App</h2>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>
              <HomeIcon />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <p>Footer content</p>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    <main>Main content</main>
  </SidebarInset>
</SidebarProvider>
```

Main components:
- `SidebarProvider`: Context provider for sidebar state
- `Sidebar`: Main sidebar container
- `SidebarTrigger`: Button to toggle sidebar
- `SidebarInset`: Main content area
- `useSidebar`: Hook to access sidebar state

Sidebar properties:
- `side`: Side to display: `left | right` (default: left)
- `variant`: Style variant: `sidebar | floating | inset` (default: sidebar)
- `collapsible`: Collapse behavior: `offcanvas | icon | none` (default: offcanvas)

Content components:
- `SidebarHeader`: Header section
- `SidebarContent`: Main scrollable content
- `SidebarFooter`: Footer section
- `SidebarGroup`: Groups related items
- `SidebarGroupLabel`: Label for groups
- `SidebarGroupContent`: Content within groups
- `SidebarMenu`: Menu container
- `SidebarMenuItem`: Individual menu item
- `SidebarMenuButton`: Clickable menu button
- `SidebarMenuAction`: Action button for menu items
- `SidebarMenuBadge`: Badge for menu items
- `SidebarMenuSub`: Submenu container
- `SidebarMenuSubItem`: Submenu item
- `SidebarMenuSubButton`: Submenu button

### Display Components

#### Card

A container component for displaying content in a card layout.

```jsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

Sub-components:
- `CardHeader`: Header section
- `CardTitle`: Card title
- `CardDescription`: Card description
- `CardContent`: Main content area
- `CardFooter`: Footer section

#### Table

A comprehensive table component with header, body, and footer sections.

```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total: 1 user</TableCell>
    </TableRow>
  </TableFooter>
  <TableCaption>User list</TableCaption>
</Table>
```

Sub-components:
- `TableHeader`: Header section
- `TableBody`: Body section
- `TableFooter`: Footer section
- `TableRow`: Table row
- `TableHead`: Header cell
- `TableCell`: Body cell
- `TableCaption`: Table caption

Table properties:
- `tableClassName`: Additional classes for the inner table element

#### KVTable

A key-value table component for displaying structured data.

```jsx
<KVTable
  title="User Details"
  description="Information about the user"
  items={[
    { key: "Name", value: "John Doe" },
    { key: "Email", value: "john@example.com" },
    { key: "Role", value: "Admin" }
  ]}
  layout="default"
/>
```

Properties:
- `title`: Optional table title
- `description`: Optional description
- `items`: Array of key-value pairs
- `layout`: Layout style: `default | tight` (default: default)
- `className`: Additional CSS classes

#### Skeleton

A loading skeleton component for placeholder content.

```jsx
<Skeleton className="h-12 w-full" />
<Skeleton className="h-4 w-24" />
```

Properties:
- `className`: CSS classes to control size and shape

#### Accordion

A collapsible accordion component for organizing content.

```jsx
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Content for section 2
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

Accordion properties:
- `type`: Behavior type: `single | multiple`
- `collapsible`: Allow collapsing all items (for single type)

Sub-components:
- `AccordionItem`: Individual accordion item
- `AccordionTrigger`: Clickable header
- `AccordionContent`: Collapsible content

#### Tooltip

A tooltip component for displaying additional information on hover.

```jsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent side="top">
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

TooltipContent properties:
- `side`: Position: `top | right | bottom | left`
- `sideOffset`: Offset from the trigger (default: 8)
- `align`: Alignment: `start | center | end`
- `alignOffset`: Alignment offset
- `sticky`: Keep showing on scroll: `partial | always`
- `hideWhenDetached`: Hide when trigger not visible

#### SimpleTooltip

A simplified tooltip component with built-in provider.

```jsx
<SimpleTooltip tooltipContent="This is a tooltip" side="top">
  <Button>Hover me</Button>
</SimpleTooltip>
```

Properties:
- `children`: Trigger element
- `tooltipContent`: Content to display in tooltip
- `side`: Position: `top | right | bottom | left`
- `sideOffset`: Offset from trigger
- `align`: Alignment: `start | center | end`
- `open`: Controlled open state
- `defaultOpen`: Default open state
- `delayDuration`: Delay before showing (milliseconds)
- `disableHoverableContent`: Close when hovering content

#### Banner

A notification banner component for alerts and messages.

```jsx
<Banner style="info" onDismiss={() => console.log('dismissed')}>
  This is an informational message
</Banner>
<Banner style="error">
  An error occurred
</Banner>
```

Properties:
- `style`: Banner style: `info | error`
- `children`: Banner message content (string or React nodes)
- `onDismiss`: Optional callback when dismiss button is clicked
- `className`: Additional CSS classes

### Toast Component

#### Toaster

A toast notification component using Sonner library.

```jsx
// Add to your app root
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <>
      <Toaster />
      {/* Your app content */}
    </>
  )
}

// Use in your components
import { toast } from 'sonner'

function MyComponent() {
  return (
    <Button onClick={() => toast('Hello!')}>
      Show Toast
    </Button>
  )
}
```

The Toaster component automatically adapts to your theme (light/dark) and provides toast notifications throughout your app.