"use client"
import { cn } from "~/lib/utils"
import { MyImage } from "~/components/ui/my-image"
import HeroSectionBg from "./images/hero-section-bg.jpg"
import SPBBgFigure from "./images/hero-spb-bg-figure.svg"
import AlarmImg from "./images/alarm.png"
import ShieldImg from "./images/shield.png"
import RubleImg from "./images/ruble.png"
import DesignCircle from "./images/design-circle.svg"
import PlantLeftImg from "./images/plant-left.png"
import PlantRightImg from "./images/plant-right.png"
import DownIcon from "./images/down-icon.svg"
import { montserrat } from "~/lib/fonts"
import styles from "./hero-section.module.css"
import { Text } from "~/components/ui/text"
import { CallRequestButton } from "~/components/ui/call-request-button"
import { useMousePosition } from "~/lib/hooks"
import Link from "next/link"
import { SiteMap } from "~/lib/site-map"

interface Props extends React.ComponentPropsWithoutRef<"section"> {
    className?: string
}

export const HeroSection: React.FC<Props> = ({ className, ...props }) => {
    const { mouseX, mouseY, mouseToCenterX, mouseToCenterY } =
        useMousePosition()
    return (
        <section
            id="glavnaya"
            className={cn("p-0 sm:p-3", className)}
            {...props}
        >
            <div className="relative w-full h-full rounded-md overflow-hidden">
                <BackgroundImages
                    mouseToCenterX={mouseToCenterX}
                    mouseToCenterY={mouseToCenterY}
                />
                <div
                    className="
                        absolute
                        top-[50%]
                        left-[50%]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        flex
                        flex-col
                        gap-10
                        items-center
                        justify-center
                        w-full
                        z-10
                        cursor-default
                        fade-in-1
                    "
                >
                    {/* Hero text container */}
                    <HeroTitle />
                    {/* Advantages container */}
                    <AdvantagesCards />
                    <CallRequestButton
                        withArrow
                        shine="fast"
                        className="px-6 py-6 rounded-md hover:bg-accent hover:text-accent-foreground
                                hover:scale-[102%]
                                transition-scale duration-300"
                    >
                        <Text variant="big" className="font-bold">
                            Заказать расчёт сметы
                        </Text>
                    </CallRequestButton>
                </div>
                {/* <Link
                    href={`/${SiteMap.INDEX.anchors.SERVICES.path}`}
                    className="absolute bottom-[5dvh] left-[50%] translate-x-[-50%] "
                >
                    <MyImage
                        alt="Стрелка вниз"
                        src={DownIcon}
                        className="w-9 h-9 lg:w-11 lg:h-11 animate-point-down"
                    />
                </Link> */}
            </div>
        </section>
    )
}

const BackgroundImages: React.FC<{
    mouseToCenterX: number
    mouseToCenterY: number
}> = ({ mouseToCenterX, mouseToCenterY }) => {
    return (
        <>
            <MyImage
                src={HeroSectionBg}
                placeholder="blur"
                alt="Фотография современного интерьера"
                style={{
                    transform: `translate(calc(-50% - ${
                        mouseToCenterX * 0.001
                    }px), calc(-50% - ${mouseToCenterY * 0.001}px))`,
                }}
                className="
                        absolute
                        top-[50%]
                        left-[50%]
                        w-[calc(100%+2vw)]
                        h-[calc(100%+2vh)]
                        object-cover
                        z-[-1]
                        fade-in-1
                    "
            />
            {/* Design circle #1 */}
            <MyImage
                src={DesignCircle}
                alt="Круг"
                style={{
                    objectPosition: "32rem -7rem",
                    transform: `translate(calc(-50% - ${
                        mouseToCenterX * 0.005
                    }px), calc(-50% - ${mouseToCenterY * 0.005}px))`,
                }}
                className="
                        absolute
                        top-[0]
                        left-[50%]
                        translate-x-[calc(-50%+32rem)]
                        translate-y-[calc(-50%-7rem)]
                        w-[64rem]
                        h-[64rem]
                        object-contain
                        opacity-30
                        fade-in-0_3
                        overflow-visible
                    "
            />
            {/* Design circle #2 */}
            <MyImage
                src={DesignCircle}
                alt="Круг"
                style={{
                    objectPosition: "-50rem +7rem",
                    transform: `translate(calc(-50% + ${
                        mouseToCenterX * 0.005
                    }px), calc(-50% + ${mouseToCenterY * 0.005}px))`,
                }}
                className="
                        absolute
                        top-[50%]
                        left-[50%]
                        w-[64rem]
                        h-[64rem]
                        object-contain
                        opacity-30
                        fade-in-0_3
                        overflow-visible
                    "
            />
            {/* Left plant */}
            <MyImage
                src={PlantLeftImg}
                alt="Растение"
                style={{
                    objectPosition: "-42rem 10rem",
                    transform: `translate(calc(-50% + ${
                        mouseToCenterX * 0.01
                    }px), calc(0% + ${mouseToCenterY * 0.01}px))`,
                }}
                className="
                        absolute
                        bottom-[0]
                        left-[50%]
                        w-[30rem]
                        h-[30rem]
                        object-contain
                        fade-in-1
                        overflow-visible
                    "
            />
            {/* Right plant */}
            <MyImage
                src={PlantRightImg}
                alt="Растение"
                style={{
                    objectPosition: "13rem 10rem",
                    transform: `translate(calc(50% + ${
                        mouseToCenterX * 0.01
                    }px), calc(0% + ${mouseToCenterY * 0.01}px))`,
                }}
                className="
                        absolute
                        bottom-[0]
                        left-[50%]
                        w-[30rem]
                        h-[30rem]
                        object-contain
                        overflow-visible
                    "
            />
        </>
    )
}

const HeroTitle: React.FC = () => {
    return (
        <h1
            className={`
                        ${montserrat.className}
                        flex
                        flex-col
                        ${styles.heroTitleShadow}
                        items-center
                    `}
        >
            <span
                className={`
                            font-black
                            uppercase
                            text-[1.375rem]
                            sm:text-[2rem]
                            md:text-[2.625rem]
                            leading-[0.95]
                            ${styles.heroTitleBlackGradientText}
                            hover:scale-[102%]
                            transition-scale duration-300
                        `}
            >
                Честный
            </span>
            <span
                className={`
                            font-black
                            uppercase
                            text-[2.187rem]
                            sm:text-[3.5rem]
                            md:text-[4.25rem]
                            leading-[1.2]
                            ${styles.heroTitleBlackGradientText}
                            hover:scale-[102%]
                            transition-scale duration-300
                        `}
            >
                Ремонт&nbsp;Квартир
            </span>
            <span
                className={`
                            font-regular
                            text-[1rem]
                            sm:text-[1.5rem]
                            md:text-[2rem]
                            text-white
                            py-1
                            px-[4.5rem]
                            hover:scale-[102%]
                            transition-scale duration-300
                        `}
                style={{
                    background: `url(${SPBBgFigure.src}) no-repeat`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                }}
            >
                В&nbsp;Санкт-Петербурге
            </span>
        </h1>
    )
}

const AdvantagesCards: React.FC = () => {
    return (
        <div
            className="
                            flex
                            flex-col
                            lg:flex-row
                            justify-start
                            gap-4
                            md:gap-5
                            w-[60%]
                            sm-w-[50%]
                            md:w-[40%]
                            lg:w-full
                            lg:justify-evenly
                            items-center"
        >
            {/* Сделаем в срок */}
            <div
                className={`
                                ${styles.parallelogramBg}
                                flex
                                items-center
                                gap-2
                                pe-[2rem]
                                h-[3.5rem]
                                md:h-[4rem]
                                w-full
                                lg:w-auto
                                hover:scale-[102%]
                                transition-scale duration-300
                            `}
            >
                <MyImage
                    src={AlarmImg}
                    alt="Часы"
                    className={`
                                    w-[3rem]
                                    h-[3rem]
                                    object-contain
                                    ml-[-1rem]
                                    ${styles.advantagesIconShadow}
                                `}
                />
                <Text variant="big" className="font-bold leading-[1.2]">
                    Сделаем&nbsp;в&nbsp;срок
                </Text>
            </div>
            {/* Гарантия выполненных работ */}
            <div
                className={`
                                ${styles.parallelogramBg}
                                flex
                                items-center
                                gap-2
                                pe-[2rem]
                                h-[3.5rem]
                                md:h-[4rem]
                                w-full
                                lg:w-auto
                                hover:scale-[102%]
                                transition-scale duration-300
                            `}
            >
                <MyImage
                    src={ShieldImg}
                    alt="Шит"
                    className={`
                                    w-[3rem]
                                    h-[3rem]
                                    object-contain
                                    ml-[-1rem]
                                    ${styles.advantagesIconShadow}
                                `}
                />
                <Text variant="big" className="font-bold leading-[1.2]">
                    Гарантия
                    <br />
                    выполненных&nbsp;работ
                </Text>
            </div>
            {/* Приятные скидки на стройматериалы */}
            <div
                className={`
                                ${styles.parallelogramBg}
                                flex
                                items-center
                                gap-2
                                pe-[2rem]
                                h-[3.5rem]
                                md:h-[4rem]
                                w-full
                                lg:w-auto
                                hover:scale-[102%]
                                transition-scale duration-300
                            `}
            >
                <MyImage
                    src={RubleImg}
                    alt="Рубль"
                    className={`
                                    w-[3rem]
                                    h-[3rem]
                                    object-contain
                                    ml-[-1rem]
                                    ${styles.advantagesIconShadow}
                                `}
                />
                <Text variant="big" className="font-bold leading-[1.2]">
                    Приятные скидки
                    <br />
                    на&nbsp;стройматериалы
                </Text>
            </div>
        </div>
    )
}
