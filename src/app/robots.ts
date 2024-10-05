import { MetadataRoute } from "next"
import { DOMAIN_NAME } from "~/app/domain-name"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/admin/",
        },
        sitemap: `https://${DOMAIN_NAME}/sitemap.xml`,
    }
}
