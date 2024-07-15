"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Index = AccordionPrimitive.Root

const AccordionItem = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) => {
     return (
          <AccordionPrimitive.Item
               className={cn("border-b", className)}
               {...props}
          />
     )
}

const AccordionTrigger = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) => {
     return (
          <AccordionPrimitive.Header className="flex">
               <AccordionPrimitive.Trigger
                    className={cn(
                         "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                         className
                    )}
                    {...props}
               >
                    {children}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
               </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
     )
}

const AccordionContent = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) => {
     return (
          <AccordionPrimitive.Content
               className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
               {...props}
          >
               <div className={cn("pb-4 pt-0", className)}>{children}</div>
          </AccordionPrimitive.Content>
     )
}

export { Index, AccordionItem, AccordionTrigger, AccordionContent }