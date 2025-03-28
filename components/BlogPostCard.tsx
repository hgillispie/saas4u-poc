'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocale } from '../context/LocaleContext';

interface BlogPostCardProps {
  title: any; // Can be string or localized object
  description: any; // Can be string or localized object
  image: any; // Can be string or localized object
  slug: any; // Can be string or localized object
  cta?: any; // Can be string or localized object
}

export default function BlogPostCard({ title, description, image, slug, cta = 'Read More' }: BlogPostCardProps) {
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to get localized value
  const getLocalizedValue = (value: any, fallback: string = '') => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      return value[locale] || value.Default || fallback;
    }
    return fallback;
  };

  if (!mounted) {
    return null;
  }

  const localizedTitle = getLocalizedValue(title);
  const localizedDescription = getLocalizedValue(description);
  const localizedImage = getLocalizedValue(image);
  const localizedSlug = getLocalizedValue(slug);
  const localizedCta = getLocalizedValue(cta, 'Read More');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {localizedImage && !imageError ? (
          <Image
            src={localizedImage}
            alt={localizedTitle}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{localizedTitle}</h3>
        <p className="text-gray-600 mb-4">{localizedDescription}</p>
        <Link 
          href={`/blog/${locale}/${localizedSlug}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {localizedCta}
        </Link>
      </div>
    </div>
  );
}
