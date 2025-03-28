'use client'
import { Builder } from '@builder.io/react'
import { useLocale } from '../context/LocaleContext';

export const HeroSection = ({ 
  title, 
  subtitle, 
  image,
  class: className,
  imageWrapperClass,
  titleClass,
  subtitleClass
}: {
  title?: any;
  subtitle?: any;
  image?: any;
  class?: string;
  imageWrapperClass?: string;
  titleClass?: string;
  subtitleClass?: string;
}) => {
  const { locale } = useLocale();

  // Handle the data structure from Builder.io
  const titleText = title && typeof title === 'object' 
    ? (title[locale] || title.Default || '') 
    : (title || 'AI-Driven Customer Insights');
  const subtitleText = subtitle && typeof subtitle === 'object'
    ? (subtitle[locale] || subtitle.Default || '') 
    : (subtitle || 'Transforming North American Businesses Through Advanced Analytics');
  const imageUrl = image && typeof image === 'object'
    ? (image[locale] || image.Default || '') 
    : (image || 'https://via.placeholder.com/1920x400');

  return (
    <div className={className || 'relative h-[400px] mb-8'}>
      <div 
        className={imageWrapperClass || 'absolute inset-0 bg-cover bg-center'}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4">
        <h1 className={titleClass || 'text-4xl md:text-5xl font-bold text-center mb-4'}>
          {titleText}
        </h1>
        <p className={subtitleClass || 'text-xl text-center max-w-2xl'}>
          {subtitleText}
        </p>
      </div>
    </div>
  )
}

