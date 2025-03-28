'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QueryContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function useQuery() {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
}

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [locale, setLocale] = useState('en-US');

  const value = {
    locale,
    setLocale,
  };

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
} 