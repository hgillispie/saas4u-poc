'use client';

import { RenderBuilderContent } from "@/components/builder";
import { builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';

interface BlogPostProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('Fetching content for:', { locale, slug: params.slug });
        
        // Set user attributes before fetching
        builder.setUserAttributes({ locale: locale || params.locale });
        
        const content = await builder
          .get('blog-page', {
            userAttributes: {
              locale: locale || params.locale,
            },
            prerender: true,
            options: {
              includeRefs: true,
            },
            query: {
              'data.slug': params.slug
            }
          })
          .promise();

        console.log('Fetched content:', content);
        setContent(content);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
      }
    };

    fetchContent();
  }, [locale, params.slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <RenderBuilderContent
        content={content}
        model="blog-page"
        options={{
          locale: locale || params.locale,
          includeRefs: true,
        }}
      />
    </div>
  );
}