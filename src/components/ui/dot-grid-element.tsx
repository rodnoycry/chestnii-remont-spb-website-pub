import { cn } from "~/lib/utils"
import { MyImage } from "./my-image"

interface Props extends React.ComponentPropsWithoutRef<"img"> {
    x: string | number
    y: string | number
    width?: number
    height?: number
}

export const DotGridElement: React.FC<Props> = ({
    x,
    y,
    width = 300,
    height = 300,
    className,
    ...props
}) => {
    return (
        <MyImage
            src="/images/dot-grid.svg"
            alt="Дизайн элемент"
            width={width}
            height={height}
            className={cn(
                "absolute left-50 translate-x-[-50%] z-0 w-[300px] h-[300px] object-contain overflow-visible",
                className
            )}
            style={{ objectPosition: `${x} ${y}` }}
            {...props}
        />
    )
}
