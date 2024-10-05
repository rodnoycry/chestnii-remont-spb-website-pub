import { FORM_ENDPOINT } from "../contacts"

export const sendForm = async ({
    name,
    phoneNumber,
}: {
    name: string
    phoneNumber: string
}) => {
    const data = { name, phoneNumber }
    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

export const getIsPhoneNumberValid = (phoneNumber: string): boolean => {
    const numberMatches = phoneNumber.match(/\d+/g)
    let numbers = ""
    if (numberMatches) {
        numbers = numberMatches.reduce(
            (acc: string, curr: string) => `${acc}${curr}`
        )
    }

    if (
        numbers.length === 11 &&
        numbers[0] === "7" &&
        ["8", "9"].includes(numbers[1])
    ) {
        return true
    }
    return false
}

export const getIsNameValid = (name: string) => !!name
