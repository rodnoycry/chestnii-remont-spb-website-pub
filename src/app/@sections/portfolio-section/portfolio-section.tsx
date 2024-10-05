"use client"
import { Title, Text, Subtitle } from "~/components/ui/text"
import { cn } from "~/lib/utils"
import { PortfolioCarousel } from "./components/portfolio-carousel"

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

export const PortfolioSection: React.FC<Props> = ({ className, ...props }) => {
    return (
        <section
            id="portfolio"
            className={cn("p-0 sm:px-3 sm:pb-3", className)}
            {...props}
        >
            <div className="relative w-full h-full rounded-md bg-white overflow-hidden py-[5rem] flex flex-col items-center justify-center gap-[2rem] md:gap-[4rem]">
                <Title className="max-w-[37ch] w-[90%] text-center">
                    Более{" "}
                    <span className="text-primary">10&nbsp;лет&nbsp;опыта</span>{" "}
                    и <span className="text-primary">250&nbsp;проектов</span>{" "}
                    за&nbsp;спиной. Посмотрите лишь некоторые из&nbsp;них:
                </Title>
                <div className="flex flex-col gap-8">
                    <div className="w-full flex flex-col gap-4">
                        <Subtitle className="w-full text-center uppercase font-light tracking-wide text-[1.2rem] sm:text-[1.3rem]">
                            г. Санкт-Петербург, ЖК «Ручьи»
                        </Subtitle>
                        <PortfolioCarousel
                            slideCount={10}
                            baseUrl="/portfolio-section/images/1/"
                            imagesExtension="jpg"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <Subtitle className="w-full text-center uppercase font-light tracking-wide text-[1.2rem] sm:text-[1.3rem]">
                            г. Санкт-Петербург, улица Кораблестроителей
                        </Subtitle>
                        <PortfolioCarousel
                            slideCount={10}
                            baseUrl="/portfolio-section/images/2/"
                            imagesExtension="jpg"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <Subtitle className="w-full text-center uppercase font-light tracking-wide text-[1.2rem] sm:text-[1.3rem]">
                            г. Санкт-Петербург, ЖК «FoRest Аквилон»
                        </Subtitle>
                        <PortfolioCarousel
                            slideCount={8}
                            baseUrl="/portfolio-section/images/3/"
                            imagesExtension="jpg"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <Subtitle className="w-full text-center uppercase font-light tracking-wide text-[1.2rem] sm:text-[1.3rem]">
                            г. Санкт-Петербург, ул. Бухарестская
                        </Subtitle>
                        <PortfolioCarousel
                            slideCount={6}
                            baseUrl="/portfolio-section/images/4/"
                            imagesExtension="jpg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
