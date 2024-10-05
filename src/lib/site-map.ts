export const SiteMap = {
    INDEX: {
        path: "/",
        title: "Главная",
        anchors: {
            CALCULATOR: { title: "Калькулятор", path: "#calculator" },
            SERVICES: { title: "Услуги и цены", path: "#uslugi" },
            ADVANTAGES: { title: "Преимущества", path: "#preimuschestva" },
            REVIEWS: { title: "Отзывы", path: "#otzivi" },
        },
    },
    INTERIOR_DESIGN: {
        // path: "/design-interiera",
        path: "https://positive-vision-337902.framer.app/",
        title: "Дизайн интерьера",
    },
    SECONDARY_RENO: {
        // path: "/remont-vtorichki",
        path: "https://biggest-needs-114583.framer.app/",
        title: "Ремонт вторички",
    },
    NEW_FLAT_RENO: {
        // path: "/otdelka-novostroiki",
        path: "https://dandy-premise-782283.framer.app/",
        title: "Отделка новостройки",
    },
    // LEGAL
    PRIVACY: {
        path: "/obrabotka-pd",
        title: "Политика обработки персональных данных",
    },
} as const
