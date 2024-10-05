"use client"
import { LogoPanel } from "./components/logo-panel"
import { NavigationPanel } from "./components/navigation-panel"
import { ContactsPanel } from "./components/contacts-panel"
import { motion } from "framer-motion"

export const HEADER_HEIGHT = "3.5rem"

export const Header: React.FC = () => {
    return (
        <header
            className={`
                fixed
                top-0
                z-50 
                w-full
                border-b
                border-border/40
                bg-background/95
                backdrop-blur
                supports-[backdrop-filter]:bg-background/60
                flex
                flex-col
                justify-center
                items-center
            `}
        >
            <motion.div
                className={`
                    grid
                    grid-cols-[auto_1fr]
                    xl:grid-cols-3
                    max-w-screen-2xl
                    w-full
                    justify-center
                    items-center
                    px-4
                `}
                initial={{ opacity: 0, transform: "translateY(-50%)" }}
                animate={{ opacity: 1, transform: "translateY(0%)" }}
                transition={{ duration: 0.5 }}
                style={{ height: HEADER_HEIGHT }}
            >
                <div>
                    <LogoPanel />
                </div>
                <NavigationPanel className="hidden xl:block" />
                <div>
                    <ContactsPanel />
                </div>
            </motion.div>
        </header>
    )
}
