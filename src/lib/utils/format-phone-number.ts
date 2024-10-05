const basePattern = "+7 (XXX) XXX-XX-XX"
const digitPattern = "\\d"

// Generate all possible regex patterns from the basePattern
const phoneNumberPatterns: Array<{
    pattern: RegExp
    start: number
    end: number
}> = []
for (let i = 0; i < basePattern.length; i++) {
    for (let j = i + 1; j <= basePattern.length; j++) {
        const subPattern = basePattern.substring(i, j)
        const regexPattern = subPattern
            .replace(/X/g, digitPattern)
            .replace(/[\+\(\)\-\s]/g, "\\$&")
        phoneNumberPatterns.push({
            pattern: new RegExp(regexPattern),
            start: i,
            end: j,
        })
    }
}

export const formatPhoneNumber = ({
    prevPhoneNumber,
    newPhoneNumber,
    withRemovingExtraCharOnDelete = false,
}: {
    prevPhoneNumber: string
    newPhoneNumber: string
    withRemovingExtraCharOnDelete?: boolean
}): string => {
    const preformatedPhoneNumber = replaceFirst8to7(newPhoneNumber)
    const longestMatchData = getLongestMatchData(preformatedPhoneNumber)

    const isDeleting =
        prevPhoneNumber.startsWith(newPhoneNumber) &&
        newPhoneNumber.length === prevPhoneNumber.length - 1

    const beforeMatched = {
        template: basePattern.substring(0, longestMatchData.template.start),
        input: preformatedPhoneNumber.substring(
            0,
            longestMatchData.input.start
        ),
    }
    const matched = {
        template: basePattern.substring(
            longestMatchData.template.start,
            longestMatchData.template.end
        ),
        input: preformatedPhoneNumber.substring(
            longestMatchData.input.start,
            longestMatchData.input.end
        ),
    }
    const afterMatched = {
        template: basePattern.substring(longestMatchData.template.end),
        input: preformatedPhoneNumber.substring(longestMatchData.input.end),
    }

    let formatedPhoneNumber = "+7 ("
    if (!beforeMatched.template.includes("X")) {
        if (afterMatched.input) {
            const unformated = removeFirst7(
                `${beforeMatched.template}${matched.input}${afterMatched.input}`
            )
            formatedPhoneNumber = replacePlaceholderWithNumbers(
                removeFirst7(unformated),
                basePattern
            )
        } else {
            formatedPhoneNumber = `${beforeMatched.template}${matched.input}`
        }
    } else {
        const withoutFirst7 = removeFirst7(preformatedPhoneNumber)
        formatedPhoneNumber = replacePlaceholderWithNumbers(
            withoutFirst7,
            basePattern
        )
    }

    if (withRemovingExtraCharOnDelete && isDeleting) {
        formatedPhoneNumber = removeCharsToLastDigit(formatedPhoneNumber)
    }
    return formatedPhoneNumber
}

function replacePlaceholderWithNumbers(input: string, template: string) {
    const numberMatches = input.match(/\d+/g)
    let numbers = ""
    if (numberMatches) {
        numbers = numberMatches.reduce(
            (acc: string, curr: string) => `${acc}${curr}`
        )
    }
    let replacementIndex = 0
    let result = ""

    for (let i = 0; i < template.length; i++) {
        if (template[i] === "X") {
            if (replacementIndex < numbers.length) {
                result += numbers[replacementIndex++]
            } else {
                break
            }
        } else {
            result += template[i]
        }
    }
    return result
}

const replaceFirst8to7 = (phoneNumber: string) => {
    const numberMatches = phoneNumber.match(/\d+/g)
    let numbers = ""
    if (numberMatches) {
        numbers = numberMatches.reduce(
            (acc: string, curr: string) => `${acc}${curr}`
        )
    }
    if (numbers && numbers[0][0] === "8") {
        return phoneNumber.replace("8", "7")
    }
    return phoneNumber
}

const removeFirst7 = (phoneNumber: string) => {
    const numberMatches = phoneNumber.match(/\d+/g)
    let numbers = ""
    if (numberMatches) {
        numbers = numberMatches.reduce(
            (acc: string, curr: string) => `${acc}${curr}`
        )
    }
    if (numbers && numbers[0][0] === "7") {
        return phoneNumber.replace("7", "")
    }
    return phoneNumber
}

function removeCharsToLastDigit(str: string) {
    const lastDigitIndex = str
        .split("")
        .reverse()
        .findIndex((char) => !isNaN(parseInt(char, 10)))
    return lastDigitIndex !== -1
        ? str.slice(0, str.length - lastDigitIndex)
        : ""
}

const getLongestMatchData = (input: string) => {
    const longestMatchData = {
        match: "",
        input: { start: 0, end: 0 },
        template: {
            start: 0,
            end: 0,
        },
    }

    // Find the longest matching part
    phoneNumberPatterns.forEach((patternData) => {
        const match = input.match(patternData.pattern)
        if (
            match?.index !== undefined &&
            match[0].length > longestMatchData.match.length
        ) {
            longestMatchData.match = match[0]
            longestMatchData.input.start = match.index
            longestMatchData.input.end = match.index + match[0].length
            longestMatchData.template.start = patternData.start
            longestMatchData.template.end = patternData.end
        }
    })

    return longestMatchData
}
