import { cva, type VariantProps } from "class-variance-authority"
import { inter, montserrat } from "~/lib/fonts"
import { cn } from "~/lib/utils"

type HProps = React.HTMLProps<HTMLHeadingElement>

export const Title: React.FC<HProps> = ({ children, className, ...props }) => {
    return (
        <h2
            className={cn(
                `text-[2.125rem] sm:text-[3.125rem] sm:leading-[130%] font-bold ${montserrat.className}`,
                className
            )}
            {...props}
        >
            {children}
        </h2>
    )
}

export const Subtitle: React.FC<HProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <h3
            className={cn(
                `text-[1.55rem] leading-[120%] sm:text-[1.75rem] sm:leading-[130%] font-bold text-foreground ${montserrat.className}`,
                className
            )}
            {...props}
        >
            {children}
        </h3>
    )
}

export const textVariants = cva("font-normal", {
    variants: {
        variant: {
            small: "text-[0.81rem]",
            default:
                "text-[0.875rem] leading-[140%] sm:text-[0.937rem] sm:leading-[160%]",
            bigger: "text-[1rem] leading-[140%] sm:text-[1.06rem] leading-[160%] ",
            big: "text-[1.1rem] leading-[140%] sm:text-[1.15rem] md:text-[1.25rem]  leading-[160%] ",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

export interface TextProps
    extends React.HTMLProps<HTMLParagraphElement>,
        VariantProps<typeof textVariants> {}

export const Text: React.FC<TextProps> = ({
    children,
    className,
    variant,
    ...props
}) => {
    return (
        <p
            className={cn(
                `${inter.className}`,
                textVariants({ variant }),
                className
            )}
            {...props}
        >
            {children}
        </p>
    )
}
