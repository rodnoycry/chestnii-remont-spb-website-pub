import { Button, ButtonProps, buttonVariants } from "~/components/ui/button"
import { cn, isTextNode } from "~/lib/utils"
import { Text } from "~/components/ui/text"
import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const toggleButtonVariants = cva("group after:hidden", {
    variants: {
        variant: {
            white: `
                transition-[background-color] 
            `,
        },
        isActive: {
            true: buttonVariants({ variant: "white" }),
            false: `
                bg-transparent
                hover:bg-white
            `,
        },
    },
    defaultVariants: {
        variant: "white",
        isActive: false,
    },
})

const buttonTextVariants = cva("", {
    variants: {
        variant: {
            white: "",
        },
        isActive: {
            true: "",
            false: "",
        },
    },
    defaultVariants: {
        isActive: false,
    },
})

interface Props
    extends Omit<ButtonProps, "variant">,
        VariantProps<typeof toggleButtonVariants> {
    text?: string
    isActive?: boolean
}

export const ToggleButton: React.FC<Props> = ({
    children,
    className,
    text,
    isActive = false,
    variant = "white",
    ...props
}) => {
    const renderChildren = (children: React.ReactNode, isActive: boolean) => {
        if (isTextNode(children)) {
            return (
                <Text
                    variant="bigger"
                    className={cn(
                        "font-bold",
                        buttonTextVariants({ variant, isActive })
                    )}
                >
                    {children}
                </Text>
            )
        }
        return children
    }
    return (
        <Button
            variant="outline"
            className={cn(
                "",
                toggleButtonVariants({ variant, isActive }),
                {
                    "text-black": isActive,
                    "text-white hover:text-black": !isActive,
                },
                className
            )}
            {...props}
        >
            {renderChildren(children || text, isActive)}
        </Button>
    )
}
