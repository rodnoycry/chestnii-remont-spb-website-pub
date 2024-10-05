"use client"
import { Card, CardContent } from "~/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel"
import { Title, Text, Subtitle } from "~/components/ui/text"
import { cn } from "~/lib/utils"
import { reviews } from "./reviews"
import { MyImage } from "~/components/ui/my-image"

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

export const ReviewsSection: React.FC<Props> = ({ className, ...props }) => {
    const filteredReviews = reviews.filter((review) => review.rating >= 4)
    return (
        <section
            id="portfolio"
            className={cn("p-0 sm:px-3 sm:pb-3", className)}
            {...props}
        >
            <div
                className="relative w-full h-full rounded-md overflow-hidden py-[5rem] flex flex-col items-center justify-center gap-[2rem] md:gap-[4rem]"
                style={{ backgroundColor: "#F1B250" }}
            >
                <Title className="text-white w-full text-center px-4">
                    Отзывы заказчиков ремонта
                </Title>

                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="max-w-[80rem] w-[calc(85%-3rem)] px-3"
                >
                    <CarouselContent>
                        {filteredReviews.map((review, index) => (
                            <CarouselItem
                                key={review.id}
                                className="md:basis-1/2 lg:basis-1/3 flex items-center"
                            >
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex flex-col gap-2 p-4">
                                            <Text className="flex-1">
                                                {review.text}
                                            </Text>
                                            <div className="flex w-full gap-2 items-center">
                                                <MyImage
                                                    src={`/reviews-section/images/${review.avatar.path}`}
                                                    alt="Аватар"
                                                    width={32}
                                                    height={32}
                                                    className="object-contain rounded-full w-[2rem] h-[2rem]"
                                                />
                                                <div className="flex flex-col flex-1">
                                                    <Text
                                                        variant="bigger"
                                                        className="font-bold"
                                                    >
                                                        {review.name}
                                                    </Text>
                                                    <Text>{review.date}</Text>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}
