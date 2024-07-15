import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = ({
     className,
     ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
     <TabsPrimitive.List
          className={cn(
               "inline-flex h-10 items-center justify-center rounded-md text-muted-foreground",
               className
          )}
          {...props}
     />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = ({
     className,
     ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
     <TabsPrimitive.Trigger
          className={cn(
               "inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-second data-[state=active]:border data-[state=active]:border-sky-400 data-[state=active]:text-sky-400",
               className
          )}
          {...props}
     />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = ({
     className,
     ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
     <TabsPrimitive.Content
          className={cn(
               "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded border border-border bg-background py-2",
               className
          )}
          {...props}
     />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };