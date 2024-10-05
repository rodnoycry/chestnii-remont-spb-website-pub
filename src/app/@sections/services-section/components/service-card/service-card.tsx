import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { cn } from "~/lib/utils"
import { BordersElement } from "./components/borders-element"
import { Text } from "~/components/ui/text"
import { Button } from "~/components/ui/button"
import styles from "./service-card.module.css"
import { StaticImageData } from "next/image"

interface Props extends React.ComponentPropsWithoutRef<typeof Card> {
    title: string
    description: string
    price: string
    image: StaticImageData
}

export const ServiceCard: React.FC<Props> = ({
    className,
    title,
    description,
    price,
    image,
    ...props
}) => {
    return (
        <Card
            className={cn(
                `w-full h-[27rem] ${styles["service-card"]} bg-center bg-cover`,
                className
            )}
            style={{
                backgroundImage: `url(${image.src})`,
            }}
            {...props}
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription variant="bigger">
                    <span className="font-bold">{price}</span> за м²
                </CardDescription>
            </CardHeader>
            <CardContent
                className={`relative ${styles["service-card-content"]}`}
            >
                <figure className="borders-container absolute inset-x-3 inset-y-0 translate-y-[-1rem] backdrop-blur lg:backdrop-blur-none bg-background/30 lg:bg-transparent rounded-sm">
                    <BordersElement />
                </figure>
                <Text
                    className="relative leading-6 font-medium lg:font-regular lg:opacity-0"
                    style={{ zIndex: 20 }}
                >
                    {description}
                </Text>
            </CardContent>
            <CardFooter>
                <Button withArrow className="w-full">
                    Подробнее
                </Button>
            </CardFooter>
        </Card>
    )
}
