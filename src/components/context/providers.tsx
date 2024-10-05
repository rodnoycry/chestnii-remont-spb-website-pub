import { CallRequestDialogProvider } from "./call-request-dialog-context"
import { ViewportSizeProvider } from "./viewport-context"

interface Props {
    children: React.ReactNode
}

export const Providers: React.FC<Props> = ({ children }) => {
    return (
        <ViewportSizeProvider>
            <CallRequestDialogProvider>{children}</CallRequestDialogProvider>
        </ViewportSizeProvider>
    )
}
