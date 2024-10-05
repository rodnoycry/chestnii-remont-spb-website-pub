import { HeroSection } from "./@sections/hero-section"
import { PortfolioSection } from "./@sections/portfolio-section/portfolio-section"
import { ServicesSection } from "./@sections/services-section"
import { AdvantagesSection } from "./@sections/advantages-section"
import { ReviewsSection } from "./@sections/reviews-section"
import { CallReqeustSection } from "./@sections/call-request-section"
import { CalculatorSection } from "./@sections/calculator-section"

export default function Home() {
    const heroPaddingTop = "3rem"
    return (
        <main
            className="flex min-h-screen w-full max-w-screen-2xl flex-col justify-center"
            style={{ paddingTop: heroPaddingTop }}
        >
            <HeroSection
                className="w-full 2xl:max-h-[45rem]"
                style={{ height: `calc(100dvh - ${heroPaddingTop})` }}
                // style={{ height: `30rem` }}
            />
            <AdvantagesSection className="w-full" />
            <ServicesSection className="w-full" />
            <PortfolioSection className="w-full" />
            <ReviewsSection className="w-full" />
            <CalculatorSection className="w-full" />
            <CallReqeustSection className="w-full" />
        </main>
    )
}
