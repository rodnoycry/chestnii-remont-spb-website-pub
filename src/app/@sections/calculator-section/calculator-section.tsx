"use client"
import { CallRequestButton } from "~/components/ui/call-request-button"
import { Title, Text, Subtitle } from "~/components/ui/text"
import { cn } from "~/lib/utils"
import { MyImage } from "~/components/ui/my-image"
import CalculatorBg from "./images/calculator-bg.jpg"
import { Calculator } from "./components/calculator"
import { SiteMap } from "~/lib/site-map"
import { useParallax } from "~/lib/hooks"
import { useEffect, useRef, useState } from "react"
import {
    useScroll,
    useTransform,
    motion,
    type MotionValue,
} from "framer-motion"

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

export const CalculatorSection: React.FC<Props> = ({ className, ...props }) => {
    const [elementTop, setElementTop] = useState(0)
    const [elementHeight, setElementHeight] = useState(0)
    const backgroundContainerRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScroll()

    // Calculate the Y offset for parallax effect
    const imageYOffset = useTransform(
        scrollY,
        [elementTop - elementHeight, elementTop + elementHeight],
        ["-35%", "35%"]
    )
    const offsetMultiplier = 2
    // useEffect to calculate and update the element's position and height
    useEffect(() => {
        const handleResize = () => {
            if (backgroundContainerRef.current) {
                setElementTop(backgroundContainerRef.current.offsetTop)
                setElementHeight(backgroundContainerRef.current.offsetHeight)
            }
        }

        // Initial call and setup event listener on window resize
        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [backgroundContainerRef.current])

    return (
        <section
            id={SiteMap.INDEX.anchors.CALCULATOR.path.replace("#", "")}
            className={cn("p-0 sm:px-3 sm:pb-3", className)}
            {...props}
        >
            <div
                ref={backgroundContainerRef}
                className="relative w-full h-full rounded-md overflow-hidden py-[5rem] flex flex-col items-center justify-center gap-[2rem] md:gap-[4rem]"
            >
                <Background imageYOffset={imageYOffset} />
                <Title className="text-white">Онлайн-Калькулятор</Title>
                <Calculator />
            </div>
        </section>
    )
}

const Background: React.FC<{
    imageYOffset?: MotionValue<number> | MotionValue<string>
    height?: number | string
}> = ({ imageYOffset = 0, height }) => {
    return (
        <>
            <motion.div
                style={{ y: imageYOffset }}
                className="absolute top-0 left-0 h-full w-full z-[-2]"
            >
                <MyImage
                    src={CalculatorBg}
                    placeholder="blur"
                    alt="Фотография современного интерьера"
                    layout="fill"
                />
            </motion.div>
            <div
                className="
                        absolute
                        top-[50%]
                        left-[50%]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        w-full
                        h-full
                        z-[-1]
                        bg-black/60
                        fade-in-1
                    "
            />
        </>
    )
}
