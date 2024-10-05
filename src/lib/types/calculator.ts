import { ValueOf } from "./utils"

export type CounterDataType = {
    min: number
    max: number
    state: number
}

export const FeatureEnum = {
    "FLOOR_LEVELING": "FLOOR_LEVELING",
    "WALL_ALIGNMENT": "WALL_ALIGNMENT",
    "PLUMBING_WORK": "PLUMBING_WORK",
    "ELECTRICAL_WORK": "ELECTRICAL_WORK",
}

export type FeatureType = ValueOf<typeof FeatureEnum>

export type FeatureData = {
    title: string
    state: boolean
}

export const AppartmentTypeEnum = {
    "SECONDARY": "SECONDARY",
    "NEW": "NEW",
}

export type AppartmentType = ValueOf<typeof AppartmentTypeEnum>

export type CalculatorConfigType = {
    type: {
        state: ValueOf<typeof AppartmentTypeEnum>
    }
    area: CounterDataType
    roomsQty: CounterDataType
    bathroomsQty: CounterDataType
    features: Record<FeatureType, FeatureData>
}
