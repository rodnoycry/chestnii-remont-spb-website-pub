import Image from "next/image"
import { cn } from "~/lib/utils"

export const MyImage: React.FC<React.ComponentProps<typeof Image>> = ({
    className,
    alt,
    ...props
}) => {
    return (
        <Image
            className={cn("w-full h-full object-cover", className)}
            alt={alt}
            {...props}
        />
    )
}
