"use client"

import { MyImage } from "~/components/ui/my-image"
import { Menubar, MenubarMenu, MenubarTrigger } from "~/components/ui/menubar"
import { cn } from "~/lib/utils"
import { BurgerMenuContent } from "./components/burger-menu-content"
import { Drawer, DrawerContent } from "~/components/ui/drawer"
import { MenubarContent, MenubarItem } from "~/components/ui/menubar"
import React, { useState } from "react"
import { Breakpoints } from "~/lib/breakpoints"
import { useViewportSize } from "~/components/context/viewport-context"
import { Button, ButtonProps } from "~/components/ui/button"

interface Props {
    className?: string
    showContacts?: boolean
    showCallRequestButton?: boolean
}

const DrawerMenuBreakpoint = Breakpoints.sm

export const BurgerMenu: React.FC<Props> = ({
    className,
    showContacts = false,
    showCallRequestButton = false,
}) => {
    const [drawerOpened, setDrawerOpened] = useState<boolean>(false)
    const { width } = useViewportSize()
    const isDrawerMenu = width && width <= DrawerMenuBreakpoint
    const isMenubarMenu = !isDrawerMenu
    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger
                        onClick={() => {
                            setDrawerOpened(true)
                        }}
                        className={cn("p-1", className)}
                    >
                        <MyImage
                            src="/images/menu-burger.svg"
                            alt="Меню"
                            width={24}
                            height={24}
                            className="object-contain w-6 h-6 cursor-pointer"
                        />
                    </MenubarTrigger>
                    {isMenubarMenu && (
                        <MenubarContent>
                            <BurgerMenuContent
                                ItemWrapper={MenubarItem}
                                showContacts={showContacts}
                                showCallRequestButton={showCallRequestButton}
                            />
                        </MenubarContent>
                    )}
                </MenubarMenu>
            </Menubar>
            <Drawer open={drawerOpened} onClose={() => setDrawerOpened(false)}>
                {isDrawerMenu && (
                    <DrawerContent
                        className="min-w-[16rem] max-w-[90vw]"
                        onOverlayClick={() => setDrawerOpened(false)}
                    >
                        <BurgerMenuContent
                            ItemWrapper={DrawerItemWrapper}
                            showContacts={showContacts}
                            showCallRequestButton={true}
                        />
                    </DrawerContent>
                )}
            </Drawer>
        </>
    )
}

interface DrawerItemWrapper extends ButtonProps {
    inset?: boolean
}

const DrawerItemWrapper = React.forwardRef<
    HTMLButtonElement,
    DrawerItemWrapper
>(({ className, inset, size = "sm", variant = "ghost", ...props }, ref) => {
    return (
        <Button
            size={size}
            variant={variant}
            className={cn("justify-start w-full", className, { "ps-7": inset })}
            ref={ref}
            {...props}
        />
    )
})
DrawerItemWrapper.displayName = "DrawerItemWrapper"
