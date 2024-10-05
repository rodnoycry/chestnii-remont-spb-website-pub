import { MetadataRoute } from "next"
import { DOMAIN_NAME } from "~/app/domain-name"
import { SiteMap } from "~/lib/site-map"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `https://${DOMAIN_NAME}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `https://${DOMAIN_NAME}/${SiteMap.INTERIOR_DESIGN.path}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `https://${DOMAIN_NAME}/${SiteMap.SECONDARY_RENO.path}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `https://${DOMAIN_NAME}/${SiteMap.NEW_FLAT_RENO.path}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        // LEGAL
        {
            url: `https://${DOMAIN_NAME}/${SiteMap.PRIVACY.path}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,
        },
    ]
}
