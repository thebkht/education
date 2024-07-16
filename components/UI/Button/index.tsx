import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
     "inline-flex items-center justify-center rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
     {
          variants: {
               variant: {
                    default:
                         "bg-primary border border-primary text-primary-foreground",
                    outline:
                         "border border-secondary bg-background hover:bg-secondary hover:text-primary-foreground",
                    secondary: "bg-primary-foreground border border-primary-foreground text-primary",
               },
               size: {
                    default: "px-4 py-3",
                    sm: "px-4 py-2 text-xs rounded",
                    lg: "px-6 py-3 text-base font-medium",
               },
          },
          defaultVariants: {
               variant: "default",
               size: "default",
          },
     }
)

export interface ButtonProps
     extends React.ButtonHTMLAttributes<HTMLButtonElement>,
     VariantProps<typeof buttonVariants> {
}

export default function Index({ className, variant, size, ...props }: ButtonProps) {
     return (
          <button
               className={cn(buttonVariants({ variant, size, className }))}
               {...props}
          />
     )
}
