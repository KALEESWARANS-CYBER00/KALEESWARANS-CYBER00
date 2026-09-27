import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kaleeswaran-tech.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'DuckDuckBot',
          'Slurp',
          'Baiduspider',
          'YandexBot',
          'PerplexityBot',
          'GPTBot',
          'ChatGPT-User',
          'Claude-Web',
          'Anthropic-ai',
          'Cohere-ai',
          'Google-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
