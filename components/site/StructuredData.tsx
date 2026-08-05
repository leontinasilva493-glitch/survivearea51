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

type CollectionItem = { name: string; path: string };

type FaqItem = { question: string; answer: string };

export function FaqStructuredData({ items }: { items: readonly FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}

export function CollectionStructuredData({
  path,
  title,
  description,
  items,
}: {
  path: string;
  title: string;
  description: string;
  items: readonly CollectionItem[];
}) {
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
      "@type": "CollectionPage",
      name: title,
      description,
      url,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: `${siteConfig.url}${item.path}`,
        })),
      },
    },
  ];

  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}
