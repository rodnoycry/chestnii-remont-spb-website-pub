"use client"
import React from "react"
import { Button, ButtonProps } from "~/components/ui/button"
import { cn, isTextNode } from "~/lib/utils"
import { useCallRequestDialog } from "~/components/context/call-request-dialog-context"
import { Text } from "~/components/ui/text"

interface Props extends ButtonProps {
    shine?: "fast" | "normal" | false
}

export const CallRequestButton = React.forwardRef<HTMLButtonElement, Props>(
    ({ children, className, onClick, shine = "normal", ...props }, ref) => {
        const { open } = useCallRequestDialog()
        const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
            open()
            onClick?.(e)
        }

        const renderChildren = () => {
            // If children is a text node, wrap it in the Text component
            if (isTextNode(children)) {
                return <Text className="font-semibold">{children}</Text>
            }
            // If children is not a text node, render it as is
            return children
        }

        return (
            <Button
                className={cn(
                    "",
                    {
                        "animate-shining": shine === "normal",
                        "animate-shining-fast": shine === "fast",
                    },
                    className
                )}
                onClick={handleClick}
                ref={ref}
                {...props}
            >
                {renderChildren()}
            </Button>
        )
    }
)

CallRequestButton.displayName = "CallRequestButton"
