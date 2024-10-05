"use client"
import Image from "next/image"
import { CallRequestButton } from "~/components/ui/call-request-button"
import { DotGridElement } from "~/components/ui/dot-grid-element"
import { Title, Text, Subtitle } from "~/components/ui/text"
import { cn } from "~/lib/utils"

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

export const AdvantagesSection: React.FC<Props> = ({ className, ...props }) => {
    return (
        <section
            id="advantages"
            className={cn("p-0 sm:px-3 sm:pb-3", className)}
            {...props}
        >
            <div className="relative w-full h-full rounded-md bg-white overflow-hidden py-[5rem] flex flex-col items-center justify-center gap-[2rem] md:gap-[4rem]">
                <DotGridElement
                    x="40rem"
                    y="-12rem"
                    width={300}
                    height={300}
                    className="z-[0]"
                />
                <div className="w-full flex flex-col gap-4 md:gap-7 items-center z-10">
                    <Title className="max-w-[37ch] w-[90%] text-center">
                        Как мы <span className="text-primary">работаем</span>
                    </Title>
                    <Text variant="bigger" className="text-center max-w-[50ch]">
                        Мы — бригада, с опытом работы более 10 лет — поможем
                        воплотить в жизнь ваши самые смелые идеи в ремонте
                    </Text>
                </div>
                <div className="flex flex-col gap-[4rem] w-[90%] max-w-[78rem] z-10">
                    <div className="grid grid-cols-3 gap-x-[1.5rem] gap-y-[4rem] w-full">
                        <AdvantageCard
                            title="1. Договор"
                            description="Зафиксируем смету, сроки и стоимость - Вы не заплатите больше, чем ожидали"
                            iconLink="/advantages-section/images/contract-icon.svg"
                        />
                        <AdvantageCard
                            title="2. Бесплатно"
                            description="Дадим рекомендации и сформулируем предложение по стоимости"
                            iconLink="/advantages-section/images/ruble-icon.svg"
                        />
                        <AdvantageCard
                            title="3. Поэтапная оплата"
                            description="Цена фиксируется в договоре, а все этапы работ оплачиваются после подписания акта приема-передачи"
                            iconLink="/advantages-section/images/timetable-icon.svg"
                        />
                        <AdvantageCard
                            title="4. Гарантия до 5 лет"
                            description="Будьте уверены в будущем Вашего ремонта"
                            iconLink="/advantages-section/images/certificate-icon.svg"
                        />
                        <AdvantageCard
                            title="5. Фото- и видеоотчёты"
                            description="Контролируйте ремонт квартир на всех этапах в WhatsApp, Telegram или Viber"
                            iconLink="/advantages-section/images/camera-icon.svg"
                        />
                        <AdvantageCard
                            title="6. Материалы"
                            description="Заказываем материалы на строительных базах — вы сэкономите за счет наших скидок у поставщиков"
                            iconLink="/advantages-section/images/materials-icon.svg"
                        />
                    </div>
                    <CallRequestButton withArrow className="w-full py-6">
                        <Text variant="big" className="font-bold">
                            Заказать расчёт сметы
                        </Text>
                    </CallRequestButton>
                </div>
            </div>
        </section>
    )
}

interface AdvantageCardProps {
    title: string
    description: string
    iconLink: string
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({
    title,
    description,
    iconLink,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <Image
                src={iconLink}
                alt={title}
                width={64}
                height={64}
                className="w-[4rem] h-[4rem] object-contain"
            />
            <Subtitle className="uppercase">{title}</Subtitle>
            <Text>{description}</Text>
        </div>
    )
}
