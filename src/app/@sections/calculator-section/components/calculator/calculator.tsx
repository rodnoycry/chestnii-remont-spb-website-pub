"use client"
import { useState } from "react"
import { Button, ButtonProps } from "~/components/ui/button"
import { CallRequestButton } from "~/components/ui/call-request-button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Slider } from "~/components/ui/slider"
import { Subtitle, Text } from "~/components/ui/text"
import { ToggleButton } from "~/components/ui/toggle-button"
import {
    AppartmentType,
    AppartmentTypeEnum,
    CalculatorConfigType,
    FeatureEnum,
} from "~/lib/types/calculator"
import { cn } from "~/lib/utils"
import { calculateRenovationCost } from "./functions"

const CalculatorConfig: CalculatorConfigType = {
    type: {
        state: AppartmentTypeEnum.NEW,
    },
    area: {
        min: 15,
        max: 200,
        state: 45,
    },
    roomsQty: {
        min: 1,
        max: 7,
        state: 2,
    },
    bathroomsQty: {
        min: 1,
        max: 3,
        state: 1,
    },
    features: {
        [FeatureEnum.FLOOR_LEVELING]: {
            title: "Выравнивание полов",
            state: false,
        },
        [FeatureEnum.WALL_ALIGNMENT]: {
            title: "Выравнивание стен",
            state: false,
        },
        [FeatureEnum.PLUMBING_WORK]: {
            title: "Сантехнические работы",
            state: false,
        },
        [FeatureEnum.ELECTRICAL_WORK]: {
            title: "Электромонтажные работы",
            state: false,
        },
    },
} as const

const MIN_AREA = CalculatorConfig.area.min
const MAX_AREA = CalculatorConfig.area.max

const MIN_ROOMS = CalculatorConfig.roomsQty.min
const MAX_ROOMS = CalculatorConfig.roomsQty.max

const MIN_BATHROOMS = CalculatorConfig.bathroomsQty.min
const MAX_BATHROOMS = CalculatorConfig.bathroomsQty.max

export const Calculator: React.FC<React.ComponentPropsWithRef<"div">> = ({
    className,
    ...props
}) => {
    // Type
    const [type, setType] = useState<AppartmentType>(
        CalculatorConfig.type.state
    )
    const onTypeChange = (value: AppartmentType) => {
        setType(value)
    }

    // Area
    const [area, setArea] = useState(CalculatorConfig.area.state)
    const onAreaChange = (value: number) => {
        if (value < MIN_AREA) {
            setArea(MIN_AREA)
            return
        }
        if (value > MAX_AREA) {
            setArea(MAX_AREA)
            return
        }
        setArea(value)
    }

    // Rooms
    const [roomsQty, setRoomsQty] = useState(CalculatorConfig.roomsQty.state)
    const onRoomsQtyChange = (value: number) => {
        if (value < MIN_ROOMS) {
            setRoomsQty(MIN_ROOMS)
            return
        }
        if (value > MAX_ROOMS) {
            setRoomsQty(MAX_ROOMS)
            return
        }
        setRoomsQty(value)
    }

    // Bathrooms
    const [bathroomsQty, setBathroomsQty] = useState(
        CalculatorConfig.bathroomsQty.state
    )
    const onBathroomsQtyChange = (value: number) => {
        if (value < MIN_BATHROOMS) {
            setBathroomsQty(MIN_BATHROOMS)
            return
        }
        if (value > MAX_BATHROOMS) {
            setBathroomsQty(MAX_BATHROOMS)
            return
        }
        setBathroomsQty(value)
    }

    // Features
    const [featuresData, setFeaturesData] = useState(CalculatorConfig.features)
    const toggleFeatureState = (
        key: keyof typeof CalculatorConfig.features
    ) => {
        setFeaturesData((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                state: !prev[key].state,
            },
        }))
    }
    return (
        <div
            className={cn(
                "grid lg:grid-cols-2 gap-10 w-[90%] max-w-[78rem]",
                className
            )}
            {...props}
        >
            <div className="flex flex-col gap-6 text-white w-full lg:max-w-[34rem]">
                {/* Type */}
                <div className="w-full flex flex-col gap-1">
                    <Text variant="bigger" className="font-bold">
                        Тип квартиры
                    </Text>
                    <TypeSelect type={type} onTypeChange={onTypeChange} />
                </div>
                {/* Area */}
                <div className="w-full flex flex-col gap-1">
                    <Text variant="bigger" className="font-bold">
                        Площадь квартиры
                    </Text>
                    <AreaSlider area={area} onAreaChange={onAreaChange} />
                </div>
                {/* Rooms and bathrooms qty */}
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-1">
                        <Text variant="bigger" className="font-bold">
                            Комнаты
                        </Text>
                        <div className="flex flex-wrap gap-3">
                            <Counter
                                title={`${roomsQty}`}
                                value={roomsQty}
                                onValueChange={onRoomsQtyChange}
                                className="bg-white rounded-md text-black"
                                titleClassName="w-[5ch]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Text variant="bigger" className="font-bold">
                            Санузлы
                        </Text>
                        <div className="flex flex-wrap gap-3">
                            <Counter
                                title={`${bathroomsQty}`}
                                value={bathroomsQty}
                                onValueChange={onBathroomsQtyChange}
                                className="bg-white rounded-md text-black"
                                titleClassName="w-[5ch]"
                            />
                        </div>
                    </div>
                </div>
                {/* Feauture toggles */}
                <div className="w-full flex flex-col gap-1">
                    <Text variant="bigger" className="font-bold">
                        Дополнительные опции
                    </Text>
                    <div className="w-full flex gap-3 flex-wrap">
                        {Object.entries(featuresData).map(
                            ([featureKey, featureData]) => (
                                <ToggleButton
                                    key={featureKey}
                                    isActive={featureData.state}
                                    onClick={() =>
                                        toggleFeatureState(featureKey)
                                    }
                                    className={cn(
                                        "transition-[box-shadow] duration-100 hover:shadow-md hover:shadow-white/50",
                                        {
                                            "hover:bg-transparent hover:text-whit":
                                                !featureData.state,
                                        }
                                    )}
                                >
                                    {featureData.title}
                                </ToggleButton>
                            )
                        )}
                    </div>
                </div>
            </div>
            {/* Result */}
            <Card className="flex flex-col min-h-[20rem] w-full lg:max-w-[25rem] justify-self-end transition-[box-shadow] duration-300 hover:shadow-lg hover:shadow-white/50">
                <CardHeader className="font-bold pb-3">
                    <Text variant="bigger" className="font-bold">
                        Результаты расчёта
                    </Text>
                    <Subtitle>
                        {calculateRenovationCost(
                            type,
                            area,
                            roomsQty,
                            bathroomsQty,
                            featuresData
                        )}{" "}
                        руб.
                    </Subtitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <Text className="color-accent">
                        Сумма сметы является примерной. Для получения более
                        точной информации оставьте заявку на замер и расчет
                        сметы.
                    </Text>
                </CardContent>
                <CardFooter>
                    <CallRequestButton withArrow className="w-full">
                        Получить точный расчёт
                    </CallRequestButton>
                </CardFooter>
            </Card>
        </div>
    )
}

const TypeSelect: React.FC<{
    type: AppartmentType
    onTypeChange: (value: AppartmentType) => void
}> = ({ type, onTypeChange }) => {
    return (
        <div className="flex flex-wrap gap-3">
            <ToggleButton
                isActive={type === AppartmentTypeEnum.NEW}
                onClick={() => onTypeChange(AppartmentTypeEnum.NEW)}
            >
                Новостройка
            </ToggleButton>
            <ToggleButton
                isActive={type === AppartmentTypeEnum.SECONDARY}
                onClick={() => onTypeChange(AppartmentTypeEnum.SECONDARY)}
            >
                Вторичка
            </ToggleButton>
        </div>
    )
}

const CounterButton: React.FC<ButtonProps> = ({
    children,
    className,
    variant,
    size,
    ...props
}) => {
    return (
        <Button
            className={cn("", className)}
            variant={variant || "ghost"}
            size={size || "icon"}
            {...props}
        >
            <Text variant="big" className="font-bold">
                {children}
            </Text>
        </Button>
    )
}

const AreaSlider: React.FC<{
    area: number
    onAreaChange: (value: number) => void
}> = ({ area, onAreaChange }) => {
    const onIncrement = () => {
        onAreaChange(area + 1)
    }
    const onDecrement = () => {
        onAreaChange(area - 1)
    }
    return (
        <div className="flex flex-wrap gap-2">
            <div className="flex w-full justify-center items-center">
                <CounterButton onClick={onDecrement} variant="ghost-white">
                    -
                </CounterButton>
                <Text
                    variant="bigger"
                    className="font-bold w-[6ch] text-center"
                >
                    {area} м²
                </Text>
                <CounterButton onClick={onIncrement} variant="ghost-white">
                    +
                </CounterButton>
            </div>
            <Slider
                value={[area]}
                onValueChange={(values) => onAreaChange(values[0])}
                min={MIN_AREA}
                max={MAX_AREA}
                step={1}
            />
        </div>
    )
}

interface CounterProps extends React.ComponentPropsWithRef<"div"> {
    title: string
    titleClassName?: string
    value: number
    onValueChange: (newValue: number) => void
    buttonVariant?: ButtonProps["variant"]
}
const Counter: React.FC<CounterProps> = ({
    title,
    titleClassName,
    value,
    onValueChange,
    className,
    buttonVariant,
    ...props
}) => {
    const defaultVariant: ButtonProps["variant"] = "ghost"
    const onIncrement = () => {
        onValueChange(value + 1)
    }
    const onDecrement = () => {
        onValueChange(value - 1)
    }
    return (
        <div
            className={cn("flex w-full justify-center items-center", className)}
            {...props}
        >
            <CounterButton
                onClick={onDecrement}
                variant={buttonVariant || defaultVariant}
                className="w-full text-end justify-end p-3"
            >
                -
            </CounterButton>
            <Text
                variant="bigger"
                className={cn("font-bold w-[6ch] text-center", titleClassName)}
            >
                {title}
            </Text>
            <CounterButton
                onClick={onIncrement}
                variant={buttonVariant || defaultVariant}
                className="w-full text-start justify-start p-3"
            >
                +
            </CounterButton>
        </div>
    )
}
