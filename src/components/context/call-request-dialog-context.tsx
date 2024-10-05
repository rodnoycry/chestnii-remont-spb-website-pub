"use client"
import { useState, createContext, useContext } from "react"
import { Dialog, DialogContent } from "~/components/ui/dialog"
import { CallRequestForm } from "../ui/call-request-form"

type CallRequestDialogControls = {
    isOpened: boolean
    open: () => void
    close: () => void
}

const CallRequestDialogContext = createContext<CallRequestDialogControls>({
    isOpened: false,
    open: () => {},
    close: () => {},
})

interface Props {
    children: React.ReactNode
}

export const CallRequestDialogProvider: React.FC<Props> = ({ children }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const open = () => setIsOpened(true)
    const close = () => setIsOpened(false)
    return (
        <CallRequestDialogContext.Provider
            value={{
                isOpened,
                open,
                close,
            }}
        >
            {children}
            <Dialog open={isOpened} onOpenChange={setIsOpened}>
                <DialogContent className="bg-accent ">
                    <CallRequestForm />
                </DialogContent>
            </Dialog>
        </CallRequestDialogContext.Provider>
    )
}

export const useCallRequestDialog = () => {
    const context = useContext(CallRequestDialogContext)
    if (!context) {
        throw new Error(
            "useCallRequestDialog must be used within a CallRequestDialogProvider"
        )
    }
    return context
}
