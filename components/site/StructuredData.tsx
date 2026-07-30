import { siteConfig } from "@/config/site";

export function ArticleStructuredData({ path, title, description, dateModified }: { path: string; title: string; description: string; dateModified: string }) {
  const url = `${siteConfig.url}${path}`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Field desk", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      dateModified,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "Verity Field Guide editors" },
      publisher: { "@type": "Organization", name: "Verity Field Guide" },
    },
  ];
  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}
