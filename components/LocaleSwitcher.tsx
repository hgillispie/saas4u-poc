'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
import { builder } from '@builder.io/react';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLocaleChange = async (newLocale: string) => {
    // Update Builder.io user attributes first
    builder.setUserAttributes({ locale: newLocale });
    
    // Update the locale in context (this will also update the cookie)
    setLocale(newLocale);
    
    // Update the URL to reflect the new locale
    const newPath = pathname.replace(/^\/blog\/[^\/]+/, `/blog/${newLocale}`);
    router.push(newPath);
  };

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
      <h3 className="text-lg font-semibold mb-2">Select Language ({locale})</h3>
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => handleLocaleChange('en-US')} 
          className={`px-4 py-2 text-left hover:bg-gray-100 rounded ${locale === 'en-US' ? 'bg-blue-50' : ''}`}
        >
          English
        </button>
        <button 
          onClick={() => handleLocaleChange('es-ES')} 
          className={`px-4 py-2 text-left hover:bg-gray-100 rounded ${locale === 'es-ES' ? 'bg-blue-50' : ''}`}
        >
          Español
        </button>
        <button 
          onClick={() => handleLocaleChange('fr-FR')} 
          className={`px-4 py-2 text-left hover:bg-gray-100 rounded ${locale === 'fr-FR' ? 'bg-blue-50' : ''}`}
        >
          Français
        </button>
      </div>
    </div>
  );
}