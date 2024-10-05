import {
    AppartmentType,
    AppartmentTypeEnum,
    FeatureData,
    FeatureEnum,
    FeatureType,
} from "~/lib/types/calculator"

const TypePrices: Record<AppartmentType, number> = {
    [AppartmentTypeEnum.NEW]: 1370,
    [AppartmentTypeEnum.SECONDARY]: 1980,
} as const

const FeaturesPrices: Record<
    FeatureType,
    (data: {
        area: number
        defaultCost: number
        roomsQty: number
        bathroomsQty: number
    }) => number
> = {
    [FeatureEnum.FLOOR_LEVELING]: ({ area }) => area * 264,
    [FeatureEnum.WALL_ALIGNMENT]: ({ defaultCost, roomsQty, bathroomsQty }) =>
        (defaultCost + 544) * (roomsQty + bathroomsQty),
    [FeatureEnum.PLUMBING_WORK]: ({ bathroomsQty }) => 8900 * bathroomsQty,
    [FeatureEnum.ELECTRICAL_WORK]: ({ roomsQty, bathroomsQty }) =>
        3500 * (roomsQty + bathroomsQty),
}

export const calculateRenovationCost = (
    type: AppartmentType,
    area: number,
    roomsQty: number,
    bathroomsQty: number,
    features: Record<string, FeatureData>
) => {
    const coefficient = 1.2
    const defaultCost = TypePrices[type]
    const areaCost = area * (defaultCost + 500)
    const roomsCost = roomsQty * 0.5 * areaCost
    const bathroomsCost = bathroomsQty * 41437

    let cost = areaCost + roomsCost + bathroomsCost
    Object.entries(features).forEach(([featureKey, featureData]) => {
        if (!featureData.state) return
        const featureCost = FeaturesPrices[featureKey as FeatureType]({
            area,
            defaultCost,
            roomsQty,
            bathroomsQty,
        })
        cost += featureCost
    })
    // Coefficient magic
    cost = cost * coefficient * 1.4
    return formatNumber(cost, 2)
}

export const formatNumber = (
    inputNumber: number,
    roundingDigits: number = 0
): string => {
    const decimal = 0
    const separator = " "
    const decpoint = "."
    const format_string = "#"

    let inputFloat = parseFloat(inputNumber.toString())

    // New logic for rounding the last digits as per the argument
    if (roundingDigits > 0) {
        const factor = Math.pow(10, roundingDigits)
        inputFloat = Math.round(inputFloat / factor) * factor
    }

    const exp10 = Math.pow(10, decimal)
    inputFloat = Math.round(inputFloat * exp10) / exp10

    const splitedNumber = Number(inputFloat)
        .toFixed(decimal)
        .toString()
        .split(decpoint)

    const firstPart = splitedNumber[0].replace(
        /(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,
        `$1${separator}`
    )

    const result = splitedNumber[1]
        ? `${firstPart}${decpoint}${splitedNumber[1]}`
        : firstPart
    return format_string.replace("#", result)
}
