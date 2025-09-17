import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import DigitalDentistry from '../../../../content/blog/digital-dentistry.mdx';

const postsMap: Record<string, any> = {
  'digital-dentistry': DigitalDentistry,
};

export async function generateStaticParams() {
  return [
    { slug: 'digital-dentistry' },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  const md = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(md);
  return {
    title: data.title as string,
    description: data.excerpt as string,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const Content = postsMap[slug];
  if (!Content) {
    notFound();
  }
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  const md = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(md);
  return (
    <div className="prose mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <article>
        <Content />
      </article>
    </div>
  );
}
