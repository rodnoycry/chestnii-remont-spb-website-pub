"use client"

import { PHONE_NUMBER } from "~/lib/contacts"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/ui/tooltip"
import { buttonVariants } from "~/components/ui/button"
import { Text } from "~/components/ui/text"
import { Breakpoints } from "~/lib/breakpoints"
import { useRouter } from "next/navigation"
import { cn, copyToClipboard } from "~/lib/utils"
import { useViewportSize } from "~/components/context/viewport-context"
import { toast } from "sonner"
import { useCallback } from "react"

const CallNumberBreakpoint = Breakpoints.lg

interface Props {
    className?: string
}

export const PhoneNumber: React.FC<Props> = ({ className }) => {
    const router = useRouter()
    const { width } = useViewportSize()

    const isCopyMode = width && width > CallNumberBreakpoint

    const handlePhoneClick = useCallback(() => {
        if (isCopyMode) {
            try {
                copyToClipboard(PHONE_NUMBER)
                toast.success("Номер успешно скопирован")
            } catch {
                toast.error("Не удалось скопировать номер")
            }
        } else {
            router.push(`tel:${PHONE_NUMBER}`)
        }
    }, [isCopyMode])
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger
                    onClick={handlePhoneClick}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        className,
                    )}
                >
                    <Text className="font-bold">
                        {formatPhoneNumber(PHONE_NUMBER)}
                    </Text>
                </TooltipTrigger>
                {isCopyMode && (
                    <TooltipContent>
                        <Text>Нажмите, чтобы скопировать</Text>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    )
}

const formatPhoneNumber = (phoneNubmer: string): string => {
    // Remove all non-digit characters from the string
    const digits = phoneNubmer.replace(/\D/g, "")

    // Assuming the country code is the first character followed by 10 digits
    if (digits.length === 11) {
        // Use a template literal to format the string
        return `+${digits[0]}\xa0(${digits.substring(
            1,
            4,
        )})\xa0${digits.substring(4, 7)}-${digits.substring(
            7,
            9,
        )}-${digits.substring(9, 11)}`
    } else {
        // If the input doesn't have 11 digits, return the original string or handle as needed
        return phoneNubmer
    }
}
