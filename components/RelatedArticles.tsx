'use client'
import { Builder } from '@builder.io/react'
import { useLocale } from '../context/LocaleContext';

interface RelatedArticle {
  title: any;
  description: any;
  image: any;
}

export const RelatedArticles = ({ 
  sectionTitle, 
  articles,
  class: className,
  titleClass,
  gridClass,
  articleClass,
  imageClass,
  articleTitleClass,
  articleDescriptionClass
}: {
  sectionTitle?: any;
  articles?: RelatedArticle[];
  class?: string;
  titleClass?: string;
  gridClass?: string;
  articleClass?: string;
  imageClass?: string;
  articleTitleClass?: string;
  articleDescriptionClass?: string;
}) => {
  const { locale } = useLocale();

  // Handle the data structure from Builder.io
  const titleText = sectionTitle && typeof sectionTitle === 'object'
    ? (sectionTitle[locale] || sectionTitle.Default || '')
    : (sectionTitle || 'More Articles');

  const displayArticles = articles?.map(article => ({
    title: article.title && typeof article.title === 'object'
      ? (article.title[locale] || article.title.Default || '')
      : (article.title || ''),
    description: article.description && typeof article.description === 'object'
      ? (article.description[locale] || article.description.Default || '')
      : (article.description || ''),
    image: article.image && typeof article.image === 'object'
      ? (article.image[locale] || article.image.Default || '')
      : (article.image || 'https://via.placeholder.com/400x200')
  })) || [];

  return (
    <section className={className || ''}>
      <h2 className={titleClass || 'text-3xl font-bold mb-5'}>{titleText}</h2>
      <div className={gridClass || 'grid grid-cols-1 md:grid-cols-3 gap-5'}>
        {displayArticles.map((article, index) => (
          <div key={index} className={articleClass || 'border rounded-lg overflow-hidden shadow'}>
            <img
              src={article.image}
              alt={article.title}
              className={imageClass || 'w-full h-auto'}
            />
            <div className="p-4">
              <h3 className={articleTitleClass || 'text-xl font-semibold mb-2'}>
                {article.title}
              </h3>
              <p className={articleDescriptionClass || 'text-sm'}>
                {article.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

