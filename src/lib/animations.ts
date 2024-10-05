export const slideDownAnimationProps = {
    initial: { opacity: 0, transform: "translateY(-50%)" },
    animate: { opacity: 1, transform: "translateY(0%)" },
    transition: { duration: 0.5 },
} as const

export const slideUpAnimationProps = {
    initial: { opacity: 0, transform: "translateY(50%)" },
    animate: { opacity: 1, transform: "translateY(0%)" },
    transition: { duration: 0.5 },
} as const
