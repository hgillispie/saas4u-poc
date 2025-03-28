'use client'
import { Builder } from '@builder.io/react'
import { useLocale } from '../context/LocaleContext';

export const ArticleContent = ({ 
  content,
  class: className,
  contentClass
}: {
  content?: any;
  class?: string;
  contentClass?: string;
}) => {
  const { locale } = useLocale();

  // Handle the data structure from Builder.io
  const contentHtml = content && typeof content === 'object'
    ? (content[locale] || content.Default || '')
    : (content || '');

  return (
    <main className={className || 'prose max-w-none mb-10'}>
      <article>
        <div 
          className={contentClass || 'prose max-w-none'}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  )
}

