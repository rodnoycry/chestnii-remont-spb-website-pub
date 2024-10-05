import { cn } from "~/lib/utils"
import styles from "./borders-element.module.css"

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export const BordersElement: React.FC<Props> = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                `${styles["borders-container"]} w-full h-full`,
                className
            )}
            {...props}
        >
            <div className={`${styles["border-side"]} ${styles["top"]}`}></div>
            <div
                className={`${styles["border-side"]} ${styles["right"]}`}
            ></div>
            <div
                className={`${styles["border-side"]} ${styles["bottom"]}`}
            ></div>
            <div className={`${styles["border-side"]} ${styles["left"]}`}></div>
        </div>
    )
}
