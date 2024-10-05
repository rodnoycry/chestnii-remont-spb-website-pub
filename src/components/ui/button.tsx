import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Loader2 } from "lucide-react"
import { MyImage } from "~/components/ui/my-image"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90 relative after:bg-light-gradient after:absolute after:w-full after:h-full after:rounded-md",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                "ghost-white": "hover:bg-white hover:text-black",
                link: "text-primary underline-offset-4 hover:underline",
                white: "bg-white hover:bg-white text-black border border-input",
                "outline-white":
                    "bg-transparent hover:bg-white text-white hover:text-black border border-input",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
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
    asChild?: boolean
    loading?: boolean
    withArrow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            loading = false,
            withArrow = false,
            disabled = false,
            children,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(
                    "gap-2",
                    buttonVariants({ variant, size, className })
                )}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <>
                        {children}
                        {withArrow && (
                            <MyImage
                                width={14}
                                height={14}
                                className="w-[14px] h-[14px] object-contain"
                                src="/images/arrow-right.svg"
                                alt="Стрелка вправо"
                            />
                        )}
                    </>
                )}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
