import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
}

export const isTextNode = (node: React.ReactNode): node is string => {
    return typeof node === "string"
}
