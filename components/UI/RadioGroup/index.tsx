import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Index({ className, ...props }: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-2", className)}
            {...props}
        />
    )
}

export const RadioGroupItem = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) => {
    return (
        <RadioGroupPrimitive.Item
            className={cn(
                "aspect-square h-5 w-5 rounded-full border-2 border-muted-foreground text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:border-primary",

                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <Circle className="h-3 w-3 fill-current text-current" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
}