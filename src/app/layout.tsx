import type { Metadata } from "next"
import { DOMAIN_NAME } from "~/app/domain-name"
import { Header } from "~/components/ui/header/header"
import { inter } from "~/lib/fonts"
import "./globals.css"
import "~/styles/animations.scss"
import { Toaster } from "~/components/ui/sonner"
import { Providers } from "~/components/context/providers"
import { Footer } from "~/components/ui/footer"

export const metadata: Metadata = {
    title: {
        template: "👷‍♂️ %s | Честный Ремонт СПБ",
        default: "👷‍♂️ Честный Ремонт СПБ",
    },
    description:
        "Честный ремонт квартир под ключ с гарантией до 5 лет. Бесплатные замер и смета, прозрачная поэтапная оплата и фиксированные цены. Прозрачное ведение работы, соблюдение сроков",
    metadataBase: new URL(`https://${DOMAIN_NAME}`),

    generator: "Next.js",
    keywords: ["Ремонт", "СПБ", "Санкт-Петербург", "Ремонт квартир"],
    formatDetection: {
        email: false,
        address: false,
        telephone: true,
    },

    openGraph: {
        title: "Честный Ремонт СПБ",
        description:
            "Качественный ремонт квартир под ключ с гарантией до 5 лет",
        url: `https://${DOMAIN_NAME}`,
        siteName: "Честный Ремонт СПБ",
        images: [
            {
                url: `https://${DOMAIN_NAME}/images/og.jpg`, // Must be an absolute URL
                width: 1800,
                height: 945,
            },
        ],
        locale: "ru_RU",
        type: "website",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col items-center `}>
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
                <Toaster />
            </body>
        </html>
    )
}
