import React from "react"
import { Text, Title } from "~/components/ui/text"
import { cn } from "~/lib/utils"
import Link from "next/link"
import InteriorDesignBg from "./images/card-bg-interior-design.jpg"
import SecondaryRenoBg from "./images/card-bg-secondary-reno.jpg"
import NewRenoBg from "./images/card-bg-new-reno.jpg"
import { MyImage } from "~/components/ui/my-image"
import { SiteMap } from "~/lib/site-map"
import { ServiceCard } from "./components/service-card"
import { DotGridElement } from "~/components/ui/dot-grid-element"

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

export const ServicesSection: React.FC<Props> = ({ className, ...props }) => {
    return (
        <section
            id="uslugi"
            className={cn("p-0 sm:px-3 sm:pb-3", className)}
            {...props}
        >
            <div className="relative w-full h-full rounded-md bg-white overflow-hidden py-[5rem] flex flex-col items-center justify-center gap-[2rem] md:gap-[4rem]">
                <DotGridElement x="40rem" y="-12rem" width={300} height={300} />
                <Title className="text-center z-10 w-full max-w-[44rem">
                    Разные услуги&nbsp;—
                    <br />
                    <span className="text-primary">единый</span>
                    &nbsp;стандарт качества
                </Title>
                <div className="flex flex-col lg:flex-row justify-center gap-4 w-[90%] max-w-[25rem] lg:max-w-[69rem]">
                    {/* INTERIOR DESIGN CARD */}
                    <Link
                        href={SiteMap.INTERIOR_DESIGN.path}
                        className="flex-1"
                    >
                        <ServiceCard
                            title="Дизайн интерьера"
                            description="
                                    В нашей команде дипломированные дизайнеры с
                                    практическим опытом от 7 до 20 лет в ремонте
                                    квартир, домов и помещений."
                            price="от 1 000 ₽"
                            image={InteriorDesignBg}
                        />
                    </Link>
                    {/* SECONDARY RENOVATION CARD */}
                    <Link href={SiteMap.SECONDARY_RENO.path} className="flex-1">
                        <ServiceCard
                            image={SecondaryRenoBg}
                            title="Ремонт вторички"
                            description="Капитальное преображение квартиры в
                                    хрущевке, брежневке или старом фонде СПб с
                                    ремонтом коммуникаций и электропроводки,
                                    заменой отделки."
                            price="от 9 800 ₽"
                        />
                    </Link>
                    {/* NEW RENOVATION CARD */}
                    <Link href={SiteMap.NEW_FLAT_RENO.path} className="flex-1">
                        <ServiceCard
                            image={NewRenoBg}
                            title="Отделка новостройки"
                            description="Комплексный ремонт новой квартиры без
                                    отделки или от предчистовой отделки до
                                    финиша, может включать закупку всех
                                    отделочных материалов."
                            price="от 8 200 ₽"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}
