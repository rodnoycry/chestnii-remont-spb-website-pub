"use client"
import { DialogContent } from "~/components/ui/dialog"
import { Subtitle, Text } from "~/components/ui/text"
import { Input, InputProps } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { FormEventHandler, useRef, useState } from "react"
import { cn, formatPhoneNumber } from "~/lib/utils"
import Link from "next/link"
import { MyImage } from "./my-image"
import { EMAIL_ADDRESS, VK_LINK, WHATSAPP_NUMBER } from "~/lib/contacts"
import { Button } from "~/components/ui/button"
import { useCallRequestDialog } from "../context/call-request-dialog-context"
import { toast } from "sonner"
import { SiteMap } from "~/lib/site-map"
import {
    getIsNameValid,
    getIsPhoneNumberValid,
    sendForm,
} from "~/lib/utils/send-call-request"

const errorMessages = {
    name: "Пожалуйста, укажите имя",
    phoneNumber: "Пожалуйста, укажите корректный номер телефона",
    inputsErrros: "Пожалуйста, заполните все обязательные поля",
    badResponse:
        "Произошла ошибка при отправке заявки, пожалуйста, попробуйте ещё раз",
}

interface Props extends React.ComponentPropsWithoutRef<"form"> {}

export const CallRequestForm: React.FC<Props> = ({ className, ...props }) => {
    const { close } = useCallRequestDialog()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const [nameInputVariant, setNameInputVariant] =
        useState<InputProps["variant"]>("default")
    const [phoneInputVariant, setPhoneInputVariant] =
        useState<InputProps["variant"]>("default")

    const [name, setName] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("")
    const phoneInputRef = useRef<HTMLInputElement | null>(null)
    const handlePhoneNumebrChange = (newPhoneNumber: string) => {
        const cursorPosition = phoneInputRef?.current?.selectionStart
        const formatedNumber = formatPhoneNumber({
            prevPhoneNumber: phoneNumber,
            newPhoneNumber,
        })
        setPhoneNumber(formatedNumber)

        if (newPhoneNumber.length < phoneNumber.length) {
            // After state update, cursor will be at the end, so restore it
            setTimeout(() => {
                if (phoneInputRef?.current && cursorPosition) {
                    phoneInputRef?.current.setSelectionRange(
                        cursorPosition,
                        cursorPosition
                    )
                }
            }, 0)
        }
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setErrorMessage("")
        const isPhoneNumberValid = getIsPhoneNumberValid(phoneNumber)
        const isNameValid = getIsNameValid(name)
        const isFormValid = isNameValid && isPhoneNumberValid
        setNameInputVariant(isNameValid ? "valid" : "invalid")
        setPhoneInputVariant(isPhoneNumberValid ? "valid" : "invalid")
        if (isFormValid) {
            setIsLoading(true)
            sendForm({ name, phoneNumber })
                .then(() => {
                    close()
                    toast.success("Заявка успешно отправлена")
                    setName("")
                    setPhoneNumber("")
                    setPhoneInputVariant("default")
                    setNameInputVariant("default")
                })
                .catch((e) => {
                    console.error(e)
                    setErrorMessage(errorMessages.badResponse)
                })
                .finally(() => setIsLoading(false))
        } else {
            if (!isNameValid && !isPhoneNumberValid) {
                setErrorMessage(errorMessages.inputsErrros)
            } else if (!isNameValid) {
                setErrorMessage(errorMessages.name)
            } else if (!isPhoneNumberValid) {
                setErrorMessage(errorMessages.phoneNumber)
            }
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col gap-4">
                <Subtitle className="text-center">
                    <span className="text-primary">Оставьте заявку</span> и мы
                    перезвоним Вам
                </Subtitle>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name" className="w-[50%]">
                        <Text
                            className={cn({
                                "text-destructive":
                                    nameInputVariant === "invalid",
                                "text-positive": nameInputVariant === "valid",
                            })}
                        >
                            Ваше имя
                        </Text>
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder=""
                        variant={nameInputVariant}
                        onFocus={() => setNameInputVariant("default")}
                        onBlur={() =>
                            !getIsNameValid(name) &&
                            setNameInputVariant("invalid")
                        }
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="phone" className="w-[50%]">
                        <Text
                            className={cn({
                                "text-destructive":
                                    phoneInputVariant === "invalid",
                                "text-positive": phoneInputVariant === "valid",
                            })}
                        >
                            Номер телефона
                        </Text>
                    </Label>
                    <Input
                        id="phone"
                        type="text"
                        placeholder="+7 (___) ___-__-__"
                        variant={phoneInputVariant}
                        onFocus={() => setPhoneInputVariant("default")}
                        onBlur={() =>
                            !getIsPhoneNumberValid(phoneNumber) &&
                            setPhoneInputVariant("invalid")
                        }
                        value={phoneNumber}
                        ref={phoneInputRef}
                        onChange={(e) =>
                            handlePhoneNumebrChange(e.target.value)
                        }
                    />
                </div>
                <Text className="text-destructive">{errorMessage}</Text>
                <div className="grid w-full items-center gap-1.5">
                    <Button withArrow type="submit" loading={isLoading}>
                        <Text className="font-bold" variant="bigger">
                            Оставить заявку
                        </Text>
                    </Button>
                    <Text variant="small">
                        Нажимая на кнопку вы соглашаетесь с{" "}
                        <Link
                            href={SiteMap.PRIVACY.path}
                            className="underline"
                            target="_blank"
                        >
                            политикой обработки персональных данных
                        </Link>
                    </Text>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <Subtitle className="text-center">
                    Неудобно говорить?{" \n"}
                    <span className="text-primary">Напишите нам</span>
                </Subtitle>
                <div className="flex justify-center items-center py-3 gap-[15%]">
                    <a
                        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
                        target="_blank"
                        className="animate-hover-elevate-children"
                    >
                        <MyImage
                            src="/images/whatsapp-icon@green-fill.svg"
                            alt="WhatsApp"
                            className="object-contain w-[4rem] h-[4rem]"
                            width={16 * 4}
                            height={16 * 4}
                        />
                    </a>
                    <a
                        href={VK_LINK}
                        target="_blank"
                        className="animate-hover-elevate-children"
                    >
                        <MyImage
                            src="/images/vk-icon@color.svg"
                            alt="ВКонтакте"
                            className="object-contain w-[4rem] h-[4rem]"
                            width={16 * 4}
                            height={16 * 4}
                        />
                    </a>
                    <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        target="_blank"
                        className="animate-hover-elevate-children"
                    >
                        <MyImage
                            src="/images/mail-icon@color.svg"
                            alt="Почта"
                            className="object-contain w-[4rem] h-[4rem]"
                            width={16 * 4}
                            height={16 * 4}
                        />
                    </a>
                </div>
            </div>
        </form>
    )
}
