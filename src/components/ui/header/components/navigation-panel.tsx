"use client"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import { Text } from "~/components/ui/text" // Import the Text component
import Link from "next/link"
import { cn } from "~/lib/utils"
import { SiteMap } from "~/lib/site-map"
import { usePathname } from "next/navigation"

interface Props {
    className?: string
}

export const NavigationPanel: React.FC<Props> = ({ className }) => {
    const pathname = usePathname()
    const hash = (typeof window !== "undefined" && window?.location?.hash) || ""

    const relativePath = `${pathname}${hash}`

    const servicesPathes = [
        `${SiteMap.INDEX.path}${SiteMap.INDEX.anchors.SERVICES.path}`,
        `${SiteMap.INTERIOR_DESIGN.path}`,
        `${SiteMap.SECONDARY_RENO.path}`,
        `${SiteMap.NEW_FLAT_RENO.path}`,
    ]
    return (
        <NavigationMenu className={cn(className, "mx-auto")}>
            <NavigationMenuList>
                {/* Калькулятор - leads to /#calculator */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link
                            href={`${SiteMap.INDEX.path}${SiteMap.INDEX.anchors.CALCULATOR.path}`}
                        >
                            <Text>{`${SiteMap.INDEX.anchors.CALCULATOR.title}`}</Text>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Услуги - has dropdown menu on hover */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={cn({
                            "bg-accent": [
                                `${SiteMap.INDEX.path}${SiteMap.INDEX.anchors.SERVICES.path}`,
                                `${SiteMap.INTERIOR_DESIGN.path}`,
                                `${SiteMap.SECONDARY_RENO.path}`,
                                `${SiteMap.NEW_FLAT_RENO.path}`,
                            ].includes(relativePath),
                        })}
                    >
                        <Link
                            href={`${SiteMap.INDEX.path}${SiteMap.INDEX.anchors.SERVICES.path}`}
                        >
                            <Text>{`${SiteMap.INDEX.anchors.SERVICES.title}`}</Text>
                        </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col gap-1 p-1">
                            {/* Dropdown items */}
                            <li>
                                <NavigationMenuLink
                                    asChild
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "min-w-full justify-start px-3 py-1",
                                        {
                                            "bg-accent":
                                                relativePath ===
                                                SiteMap.INTERIOR_DESIGN.path,
                                        }
                                    )}
                                >
                                    <Link
                                        href={`${SiteMap.INTERIOR_DESIGN.path}`}
                                    >
                                        <Text>{`${SiteMap.INTERIOR_DESIGN.title}`}</Text>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink
                                    asChild
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "min-w-full justify-start px-3 py-1",
                                        {
                                            "bg-accent":
                                                relativePath ===
                                                SiteMap.SECONDARY_RENO.path,
                                        }
                                    )}
                                >
                                    <Link
                                        href={`${SiteMap.SECONDARY_RENO.path}`}
                                    >
                                        <Text>{`${SiteMap.SECONDARY_RENO.title}`}</Text>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink
                                    asChild
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "min-w-full justify-start px-3 py-1",
                                        {
                                            "bg-accent":
                                                relativePath ===
                                                SiteMap.NEW_FLAT_RENO.path,
                                        }
                                    )}
                                >
                                    <Link
                                        href={`${SiteMap.NEW_FLAT_RENO.path}`}
                                    >
                                        <Text>{`${SiteMap.NEW_FLAT_RENO.title}`}</Text>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Преимущества - leads to /#preimuschestva */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link
                            href={`${SiteMap.INDEX.path}${SiteMap.INDEX.anchors.ADVANTAGES.path}`}
                        >
                            <Text>{`${SiteMap.INDEX.anchors.ADVANTAGES.title}`}</Text>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Отзывы - leads to /#otzivi */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link
                            href={`${SiteMap.INDEX.path}${SiteMap.INDEX.anchors.REVIEWS.path}`}
                        >
                            <Text>{`${SiteMap.INDEX.anchors.REVIEWS.title}`}</Text>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
