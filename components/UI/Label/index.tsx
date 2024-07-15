// Corrected TypeScript code for the React component
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

type IndexProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
     className?: string;
} & VariantProps<typeof labelVariants>;

const Index: React.FC<IndexProps> = ({ className, ...props }) => {
     return (
          <LabelPrimitive.Root
               className={cn(labelVariants(), className)}
               {...props}
          />
     );
};

export default Index;