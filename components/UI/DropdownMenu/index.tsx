import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const Index = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = ({ className, inset, children, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
     inset?: boolean
}) => {
     return (
          <DropdownMenuPrimitive.SubTrigger
               className={cn(
                    "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
                    inset && "pl-8",
                    className
               )}
               {...props}
          >
               {children}
               <ChevronRight className="ml-auto h-4 w-4" />
          </DropdownMenuPrimitive.SubTrigger>
     )
}

DropdownMenuSubTrigger.displayName =
     DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>) => {
     return (
          <DropdownMenuPrimitive.SubContent
               className={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-accent p-1 text-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    className
               )}
               {...props}
          />
     )
}
DropdownMenuSubContent.displayName =
     DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = ({ className, sideOffset = 4, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) => {
     return (
          <DropdownMenuPrimitive.Portal>
               <DropdownMenuPrimitive.Content
                    sideOffset={sideOffset}
                    className={cn(
                         "z-[100] min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                         className
                    )}
                    {...props}
               />
          </DropdownMenuPrimitive.Portal>
     )
}

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = ({ className, inset, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
     inset?: boolean
}) => {
     return (
          <DropdownMenuPrimitive.Item
               className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    inset && "pl-8",
                    className
               )}
               {...props}
          />
     )
}

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = ({ className, children, checked, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>) => {
     return (
          <DropdownMenuPrimitive.CheckboxItem
               className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className
               )}
               checked={checked}
               {...props}
          >
               <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <DropdownMenuPrimitive.ItemIndicator>
                         <Check className="h-4 w-4" />
                    </DropdownMenuPrimitive.ItemIndicator>
               </span>
               {children}
          </DropdownMenuPrimitive.CheckboxItem>
     )
}

DropdownMenuCheckboxItem.displayName =
     DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>) => {
     return (
          <DropdownMenuPrimitive.RadioItem
               className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className
               )}
               {...props}
          >
               <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <DropdownMenuPrimitive.ItemIndicator>
                         <Circle className="h-2 w-2 fill-current" />
                    </DropdownMenuPrimitive.ItemIndicator>
               </span>
               {children}
          </DropdownMenuPrimitive.RadioItem>
     )
}

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = ({ className, inset, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
     inset?: boolean
}) => {
     return (
          <DropdownMenuPrimitive.Label
               className={cn(
                    "px-2 py-1.5 text-sm font-semibold",
                    inset && "pl-8",
                    className
               )}
               {...props}
          />
     )
}
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) => {
     return (
          <DropdownMenuPrimitive.Separator
               className={cn("-mx-1 my-1 h-px bg-muted", className)}
               {...props}
          />
     )
}
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
     className,
     ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
     return (
          <span
               className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
               {...props}
          />
     )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
     DropdownMenuTrigger,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuCheckboxItem,
     DropdownMenuRadioItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuShortcut,
     DropdownMenuGroup,
     DropdownMenuPortal,
     DropdownMenuSub,
     DropdownMenuSubContent,
     DropdownMenuSubTrigger,
     DropdownMenuRadioGroup,
}

export default Index