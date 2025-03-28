'use client';

import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { useLocale } from '../context/LocaleContext';

// Initialize Builder.io on the client side
if (typeof window !== 'undefined') {
  builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
}

interface RenderBuilderContentProps {
  content: any;
  model: string;
  options?: any;
}

export function RenderBuilderContent({ content, model, options = {} }: RenderBuilderContentProps) {
  const [mounted, setMounted] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <BuilderComponent
      model={model}
      content={content}
      options={{
        ...options,
        locale,
        enrich: true,
      }}
    />
  );
}
