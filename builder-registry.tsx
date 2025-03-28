'use client';

import "@builder.io/widgets";
import { builder, Builder } from "@builder.io/react";
import { Button } from "./components/ui/button";
import Counter from "./components/Counter/Counter";
import Footer from "./components/Layout/Footer";
import { Header } from "./components/Layout/Header";
import HeroWithChildren from "./components/Hero/HeroWithChildren";
import IconCard from "./components/Card/IconCard";
import ImageHero from "./components/Hero/ImageHero";
import SplitHero from "./components/Hero/SplitHero";
import TextHero from "./components/Hero/TextHero";
import BlogPostCard from "./components/BlogPostCard";
import { ArticleContent } from "./components/ArticleContent";
import { HeroSection } from "./components/HeroSection";
import { RelatedArticles } from "./components/RelatedArticles";

// Initialize Builder.io on the client side
if (typeof window !== 'undefined') {
  builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
}

// Register models
Builder.register('model', {
  name: 'page',
  hideFromUI: false,
  defaults: {
    title: 'Page',
  },
});

Builder.register('model', {
  name: 'blog-listing',
  hideFromUI: false,
  defaults: {
    title: 'Blog Listing',
  },
});

Builder.register('model', {
  name: 'blog-page',
  hideFromUI: false,
  defaults: {
    title: 'Blog Post',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'longText',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
    },
    {
      name: 'image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
      required: false,
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
    },
    {
      name: 'locale',
      type: 'text',
      required: false,
      enum: ['en-US', 'es-ES', 'fr-FR']
    }
  ]
});

// Register components
Builder.registerComponent(BlogPostCard, {
  name: 'BlogPostCard',
  inputs: [
    { name: 'image', type: 'file', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'longText', localized: true },
    { name: 'cta', type: 'text', localized: true },
    { name: 'slug', type: 'text', localized: false },
    { name: 'locale', type: 'text', enum: ['en-US', 'es-ES', 'fr-FR'], required: false }
  ]
});

Builder.registerComponent(ArticleContent, {
  name: 'ArticleContent',
  inputs: [
    {
      name: 'content',
      type: 'richText',
      defaultValue: 'Article content goes here...',
    },
  ],
});

Builder.registerComponent(HeroSection, {
  name: 'HeroSection',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'AI-Driven Customer Insights'
    },
    {
      name: 'subtitle',
      type: 'string',
      defaultValue: 'Transforming North American Businesses Through Advanced Analytics'
    },
    {
      name: 'image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
      defaultValue: 'https://via.placeholder.com/1920x400'
    }
  ]
});

Builder.registerComponent(RelatedArticles, {
  name: 'RelatedArticles',
  inputs: [
    {
      name: 'sectionTitle',
      type: 'string',
      defaultValue: 'More Articles'
    },
    {
      name: 'articles',
      type: 'list',
      subFields: [
        {
          name: 'image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp']
        },
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'description',
          type: 'string'
        }
      ],
      defaultValue: []
    }
  ]
});

Builder.registerComponent(IconCard, {
  name: 'IconCard',
  inputs: [
    {
      name: 'icon',
      type: 'file',
      allowedFileTypes: ['svg', 'png', 'jpg'],
      defaultValue: 'https://via.placeholder.com/100'
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Card Title'
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'Card description goes here...'
    }
  ]
}); 