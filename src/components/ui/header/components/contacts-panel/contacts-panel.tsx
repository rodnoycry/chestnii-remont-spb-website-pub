"use client"

import { Text } from "~/components/ui/text"
import { WHATSAPP_NUMBER } from "~/lib/contacts"
import { MyImage } from "~/components/ui/my-image"
import { useViewportSize } from "~/components/context/viewport-context"
import { CallRequestButton } from "~/components/ui/call-request-button"
import { Breakpoints } from "~/lib/breakpoints"
import { PhoneNumber } from "./components/@shared/phone-number"
import { BurgerMenu } from "./components/burger-menu"

export const ContactsPanel: React.FC = () => {
    const { width } = useViewportSize()

    const showCallRequestButton = width && width > Breakpoints.xs
    const showContacts = width && width > Breakpoints.md
    const showBurgerMenu = width && width < Breakpoints.xl

    return (
        <div className="flex justify-end items-center">
            {showContacts && (
                <>
                    <PhoneNumber />

                    <Text className="font-regular text-neutral-400">|</Text>

                    <a
                        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
                        target="_blank"
                        className="animate-hover-float px-3"
                    >
                        <MyImage
                            src="/images/whatsapp-icon@green.svg"
                            alt="WhatsApp"
                            width={18}
                            height={18}
                            className="w-[1.19rem] h-[1.19rem] object-contain"
                        />
                    </a>

                    <Text className="font-regular text-neutral-400">|</Text>
                </>
            )}

            {showCallRequestButton && (
                <div className="px-3 lg:ps-3">
                    <CallRequestButton size="sm" withArrow={!showBurgerMenu}>
                        Заказать звонок
                    </CallRequestButton>
                </div>
            )}
            {showBurgerMenu && (
                <>
                    {showContacts && (
                        <Text className="font-regular text-neutral-400">|</Text>
                    )}

                    <div className="ps-3">
                        <BurgerMenu
                            showContacts={!showContacts}
                            showCallRequestButton={!showCallRequestButton}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
