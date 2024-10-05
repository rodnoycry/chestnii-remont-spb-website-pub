"use client"
import { CallRequestForm } from "~/components/ui/call-request-form"
import { Title, Text, Subtitle } from "~/components/ui/text"
import { cn } from "~/lib/utils"

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

export const CallReqeustSection: React.FC<Props> = ({
    className,
    ...props
}) => {
    return (
        <section
            id="portfolio"
            className={cn("p-0 sm:px-3 sm:pb-3", className)}
            {...props}
        >
            <div className="relative w-full h-full bg-white rounded-md overflow-hidden py-[5rem] flex flex-col items-center justify-center gap-[2rem] md:gap-[4rem]">
                <Title className="">Свяжитесь с нами</Title>
                <CallRequestForm className="flex-row gap-[5rem]" />
            </div>
        </section>
    )
}
