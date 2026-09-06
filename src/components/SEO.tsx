import { useEffect } from "react"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  schemaJson?: object
}

export default function SEO({
  title = "Magis Invitation | Undangan Digital Pernikahan Eksklusif & Web Wedding Invitation",
  description = "Buat undangan digital pernikahan eksklusif, anggun & hemat di Magis Invitation. Dilengkapi RSVP otomatis, Amplop Digital QRIS, Buku Tamu Realtime, Musik Custom, & Wedding Budget Planner.",
  keywords = "undangan digital, digital wedding invitation, undangan pernikahan digital, buat undangan digital, web pernikahan, buku tamu digital, wedding budget planner, magis invitation, template undangan digital, e-invitation pernikahan",
  canonicalUrl = "https://digitalinvitationmagis.com",
  ogImage = "/hero-preview.jpg",
  ogType = "website",
  schemaJson
}: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title

    // Helper to set or create meta tags
    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null
      if (!element) {
        element = document.createElement("meta")
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute("content", content)
    }

    // Helper to set or create link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (!element) {
        element = document.createElement("link")
        element.setAttribute("rel", rel)
        document.head.appendChild(element)
      }
      element.setAttribute("href", href)
    }

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description)
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords)
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large')

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage)
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType)
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Magis Digital Invitation')
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'id_ID')

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)

    // 5. Canonical Link
    setLinkTag('canonical', canonicalUrl)

    // 6. JSON-LD Structured Data Schema
    const scriptId = "seo-json-ld-schema"
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null

    const defaultSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://digitalinvitationmagis.com/#website",
          "url": "https://digitalinvitationmagis.com",
          "name": "Magis Digital Invitation",
          "description": "Platform Pembuatan Undangan Digital Pernikahan Eksklusif & Wedding Planner",
          "inLanguage": "id-ID"
        },
        {
          "@type": "Organization",
          "@id": "https://digitalinvitationmagis.com/#organization",
          "name": "Magis Tech Invitation",
          "url": "https://digitalinvitationmagis.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://digitalinvitationmagis.com/assets/transaparanlogo.png"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62895351878050",
            "contactType": "customer service",
            "availableLanguage": ["Indonesian", "English"]
          }
        },
        {
          "@type": "Service",
          "name": "Jasa Undangan Digital Pernikahan (Digital Wedding Invitation)",
          "provider": {
            "@type": "Organization",
            "name": "Magis Tech"
          },
          "serviceType": "Digital Invitation & Wedding Planning Tool",
          "areaServed": "Indonesia",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "IDR",
            "lowPrice": "50000",
            "highPrice": "599000",
            "offerCount": "3"
          }
        }
      ]
    }

    const targetSchema = schemaJson || defaultSchema

    if (!scriptElement) {
      scriptElement = document.createElement("script")
      scriptElement.id = scriptId
      scriptElement.type = "application/ld+json"
      document.head.appendChild(scriptElement)
    }
    scriptElement.textContent = JSON.stringify(targetSchema)

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schemaJson])

  return null
}
