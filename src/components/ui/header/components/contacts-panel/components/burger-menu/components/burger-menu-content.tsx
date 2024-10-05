"use client"
import React, { useMemo } from "react"
import Link from "next/link"
import { MyImage } from "~/components/ui/my-image"
import { Text } from "~/components/ui/text"
import { MenubarSeparator } from "~/components/ui/menubar"
import { buttonVariants } from "~/components/ui/button"
import { CallRequestButton } from "~/components/ui/call-request-button"
import { WHATSAPP_NUMBER } from "~/lib/contacts"
import { SiteMap } from "~/lib/site-map"
import { cn } from "~/lib/utils"
import { PhoneNumber } from "../../@shared/phone-number"
import { usePathname, useParams } from "next/navigation"

interface Props {
    ItemWrapper: React.FC<{
        children: React.ReactNode
        inset?: boolean
        className?: string
    }>
    showContacts?: boolean
    showCallRequestButton?: boolean
}

const INDEX_PATH = SiteMap.INDEX.path
const CALCULATOR_PATH = `${INDEX_PATH}${SiteMap.INDEX.anchors.CALCULATOR.path}`
const SERVICES_PATH = `${INDEX_PATH}${SiteMap.INDEX.anchors.SERVICES.path}`
const INTERIOR_DESIGN_PATH = SiteMap.INTERIOR_DESIGN.path
const SECONDARY_RENO_PATH = SiteMap.SECONDARY_RENO.path
const NEW_FLAT_RENO_PATH = SiteMap.NEW_FLAT_RENO.path
const ADVANTAGES_PATH = `${INDEX_PATH}${SiteMap.INDEX.anchors.ADVANTAGES.path}`
const REVIEWS_PATH = `${INDEX_PATH}${SiteMap.INDEX.anchors.REVIEWS.path}`

export const BurgerMenuContent: React.FC<Props> = ({
    ItemWrapper,
    showContacts = false,
    showCallRequestButton = false,
}) => {
    const pathname = usePathname()
    const params = useParams()
    const hash = useMemo<string>(() => window.location.hash, [params])

    const relativePath = `${pathname}${hash}`

    return (
        <>
            <Link href={INDEX_PATH}>
                <ItemWrapper
                    className={cn({
                        "bg-accent": relativePath === INDEX_PATH,
                    })}
                >
                    <Text>{`${SiteMap.INDEX.title}`}</Text>
                </ItemWrapper>
            </Link>
            <MenubarSeparator />
            <Link href={CALCULATOR_PATH}>
                <ItemWrapper
                    className={cn({
                        "bg-accent": relativePath === CALCULATOR_PATH,
                    })}
                >
                    <Text>{`${SiteMap.INDEX.anchors.CALCULATOR.title}`}</Text>
                </ItemWrapper>
            </Link>
            <MenubarSeparator />
            <Link href={SERVICES_PATH}>
                <ItemWrapper
                    className={cn({
                        "bg-accent": relativePath === SERVICES_PATH,
                    })}
                >
                    <Text>{`${SiteMap.INDEX.anchors.SERVICES.title}`}</Text>
                </ItemWrapper>
            </Link>
            <Link href={INTERIOR_DESIGN_PATH}>
                <ItemWrapper
                    className={cn({
                        "bg-accent": relativePath === INTERIOR_DESIGN_PATH,
                    })}
                    inset
                >
                    <Text>{`${SiteMap.INTERIOR_DESIGN.title}`}</Text>
                </ItemWrapper>
            </Link>
            <Link href={SECONDARY_RENO_PATH}>
                <ItemWrapper
                    className={cn({
                        "bg-accent": relativePath === SECONDARY_RENO_PATH,
                    })}
                    inset
                >
                    <Text>{`${SiteMap.SECONDARY_RENO.title}`}</Text>
                </ItemWrapper>
            </Link>
            <Link href={NEW_FLAT_RENO_PATH}>
                <ItemWrapper
                    className={cn({
                        "bg-accent": relativePath === NEW_FLAT_RENO_PATH,
                    })}
                    inset
                >
                    <Text>{`${SiteMap.NEW_FLAT_RENO.title}`}</Text>
                </ItemWrapper>
            </Link>
            <MenubarSeparator />
            <Link href={ADVANTAGES_PATH}>
                <ItemWrapper
                    className={cn({
                        "bg-accent": relativePath === ADVANTAGES_PATH,
                    })}
                >
                    <Text>{`${SiteMap.INDEX.anchors.ADVANTAGES.title}`}</Text>
                </ItemWrapper>
            </Link>
            <Link href={REVIEWS_PATH}>
                <ItemWrapper
                    className={cn({
                        "bg-accent": relativePath === REVIEWS_PATH,
                    })}
                >
                    <Text>{`${SiteMap.INDEX.anchors.REVIEWS.title}`}</Text>
                </ItemWrapper>
            </Link>
            {showContacts && (
                <>
                    <MenubarSeparator />
                    <PhoneNumber className="w-full justify-start px-3 py-1" />
                    <MenubarSeparator />
                    <a
                        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
                        target="_blank"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full justify-start gap-2 px-3 py-1"
                        )}
                    >
                        <MyImage
                            src="/images/whatsapp-icon@green.svg"
                            alt="WhatsApp"
                            width={18}
                            height={18}
                            className="w-[1.19rem] h-[1.19rem] object-contain"
                        />
                        <Text className="font-bold">WhatsApp</Text>
                    </a>
                </>
            )}
            {showCallRequestButton && (
                <>
                    <MenubarSeparator />
                    <CallRequestButton size="sm" className="w-full">
                        Заказать звонок
                    </CallRequestButton>
                </>
            )}
        </>
    )
}
