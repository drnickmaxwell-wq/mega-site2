"use client";

import * as React from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';

const components = {
  // Map any custom MDX components here (e.g., Callout, Video)
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <Component components={components as any} />
    </article>
  );
}
