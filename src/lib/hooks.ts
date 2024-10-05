import { useEffect, useState } from "react"

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
        mouseX: 0,
        mouseY: 0,
        mouseToCenterX: 0,
        mouseToCenterY: 0,
    })
    const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({
            mouseX: event.clientX,
            mouseY: event.clientY,
            mouseToCenterX: event.clientX - window.innerWidth / 2,
            mouseToCenterY: event.clientY - window.innerHeight / 2,
        })
    }
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])
    return mousePosition
}

export const useParallax = (ref: React.RefObject<HTMLElement>, speed = 0.1) => {
    const [offsetY, setOffsetY] = useState(0)

    useEffect(() => {
        if (!ref.current) return

        const { top } = ref.current.getBoundingClientRect()
        const startOffset = top + window.scrollY

        const handleScroll = () => {
            const scrollY = window.pageYOffset
            const distanceFromTop = scrollY + window.innerHeight
            if (distanceFromTop > startOffset) {
                const offset = (distanceFromTop - startOffset) * speed
                setOffsetY(offset)
            } else {
                setOffsetY(0)
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initialize at the correct position if the page starts mid-scroll

        return () => window.removeEventListener("scroll", handleScroll)
    }, [ref, speed])

    return offsetY
}
