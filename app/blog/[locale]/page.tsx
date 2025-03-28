'use client';
import { BuilderComponent } from '@builder.io/react';

export default function BlogListing({ 
  params 
}: { 
  params: { locale: string } 
}) {
  if (!params.locale) {
    return <div>Invalid locale</div>;
  }

  return (
    <BuilderComponent 
      model="blog-post"
      options={{ 
        locale: params.locale,
        query: {
          'data.slug': { $exists: true }
        }
      }}
      content={({ data }) => {
        if (!data) return null;

        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">
              {params.locale === 'en-US' ? 'Blog' : 
               params.locale === 'es-ES' ? 'Blog' : 
               'Blog'}
            </h1>
            <div className="grid gap-8">
              {data.map((post: any) => (
                <div key={post.id} className="border rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {post.data.title?.[params.locale] || post.data.title?.Default || post.data.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.data.description?.[params.locale] || post.data.description?.Default || post.data.description}
                  </p>
                  <a 
                    href={`/blog/${params.locale}/${post.data.slug?.[params.locale] || post.data.slug?.Default || post.data.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read More →
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
} 