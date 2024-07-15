"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/UI/Button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>) => {
     return (
          <AlertDialogPrimitive.Overlay
               className={cn(
                    "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    className
               )}
               {...props}
          />
     )
}

const AlertDialogContent = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>) => {
     return (
          <AlertDialogPortal>
               <AlertDialogOverlay />
               <AlertDialogPrimitive.Content
                    className={cn(
                         "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[488px] translate-x-[-50%] translate-y-[-50%] gap-6 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                         className
                    )}
                    {...props}
               />
          </AlertDialogPortal>
     )
}

const AlertDialogHeader = ({
     className,
     ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
     <div
          className={cn(
               "flex flex-col space-y-2 text-center sm:text-left",
               className
          )}
          {...props}
     />
)

const AlertDialogFooter = ({
     className,
     ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
     <div
          className={cn(
               "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
               className
          )}
          {...props}
     />
)

const AlertDialogTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>) => {
     return (
          <AlertDialogPrimitive.Title
               className={cn("text-lg font-semibold", className)}
               {...props}
          />
     )
}

const AlertDialogDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>) => {
     return (
          <AlertDialogPrimitive.Description
               className={cn("font-medium text-muted-foreground", className)}
               {...props}
          />
     )
}

const AlertDialogAction = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>) => {
     return (
          <AlertDialogPrimitive.Action
               className={cn(buttonVariants(), className)}
               {...props}
          />
     )
}

const AlertDialogCancel = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>) => {
     return (
          <AlertDialogPrimitive.Cancel
               className={cn(
                    buttonVariants({ variant: "outline" }),
                    "mt-2 sm:mt-0",
                    className
               )}
               {...props}
          />
     )
}

export {
     AlertDialog,
     AlertDialogPortal,
     AlertDialogOverlay,
     AlertDialogTrigger,
     AlertDialogContent,
     AlertDialogHeader,
     AlertDialogFooter,
     AlertDialogTitle,
     AlertDialogDescription,
     AlertDialogAction,
     AlertDialogCancel,
}