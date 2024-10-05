"use client"
import { EmblaOptionsType } from "embla-carousel"
import {
    ParallaxCarousel,
    ParallaxCarouselProps,
} from "./carousel-example/parallax-carousel"
import { cn } from "~/lib/utils"

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }

interface Props extends React.ComponentPropsWithoutRef<"div"> {
    slideCount: number
    baseUrl: string
    imagesExtension: ParallaxCarouselProps["imagesExtension"]
}

export const PortfolioCarousel: React.FC<Props> = ({
    slideCount,
    baseUrl,
    imagesExtension,
    className,
    ...props
}) => {
    const SLIDES = Array.from(Array(slideCount).keys()).map((num) => num + 1)
    return (
        <div className={cn("", className)} {...props}>
            <ParallaxCarousel
                slides={SLIDES}
                baseUrl={baseUrl}
                imagesExtension={imagesExtension}
                options={OPTIONS}
            />
        </div>
    )
}
