import Link from "next/link"
import LogoImg from "./images/logo.jpg"
import { MyImage } from "~/components/ui/my-image"
import { montserrat } from "~/lib/fonts"
import { SiteMap } from "~/lib/site-map"

export const LogoPanel: React.FC = () => {
    return (
        <Link
            href={SiteMap.INDEX.path}
            className="
                animate-hover-elevate-children
                flex
                gap-1
                justify-start
                items-center
                w-fit
                hover:scale-[102%]
                transition-scale duration-300
            "
        >
            <MyImage
                src={LogoImg}
                alt="Логотип"
                width={25}
                height={25}
                className="
                    w-[1.5rem]
                    h-[1.5rem]
                    rounded-full
                    duration-300
                "
            />
            <span
                className={`
                    ${montserrat.className}
                    font-bold
                    text-[1.2rem]
                    lg:text-[1.375rem]
                    duration-300
                `}
            >
                |
            </span>
            <span
                className={`
                    ${montserrat.className}
                    font-bold
                    text-[1.2rem]
                    lg:text-[1.375rem]
                    duration-300
                `}
            >
                Честный&nbsp;Ремонт&nbsp;СПБ
            </span>
        </Link>
    )
}
