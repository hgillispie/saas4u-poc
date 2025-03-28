'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { builder } from '@builder.io/react';

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en-US',
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState('en-US');

  useEffect(() => {
    // Get locale from cookie or default to 'en-US'
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1] || 'en-US';
    
    setLocaleState(cookieLocale);
    builder.setUserAttributes({ locale: cookieLocale });
  }, []);

  const setLocale = (newLocale: string) => {
    // Set cookie with 1 year expiry
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60*60*24*365}`;
    setLocaleState(newLocale);
    builder.setUserAttributes({ locale: newLocale });
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext); 