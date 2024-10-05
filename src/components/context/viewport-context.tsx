"use client"
import { useState, useEffect, createContext, useContext } from "react"

type ViewportSize = {
    width: number | undefined
    height: number | undefined
}

const ViewportSizeContext = createContext<ViewportSize>({
    width: undefined,
    height: undefined,
})

interface Props {
    children: React.ReactNode
}

export const ViewportSizeProvider: React.FC<Props> = ({ children }) => {
    // Initialize state with undefined width/height so server and client renders match
    const [viewportSize, setViewportSize] = useState<ViewportSize>({
        width: undefined,
        height: undefined,
    })

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        // Add event listener
        window.addEventListener("resize", handleResize)

        // Call handler right away so state gets updated with initial window size
        handleResize()

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize)
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return (
        <ViewportSizeContext.Provider value={viewportSize}>
            {children}
        </ViewportSizeContext.Provider>
    )
}

export const useViewportSize = () => {
    const context = useContext(ViewportSizeContext)
    if (!context) {
        throw new Error(
            "useViewportSize must be used within a ViewportSizeProvider",
        )
    }
    return context
}
