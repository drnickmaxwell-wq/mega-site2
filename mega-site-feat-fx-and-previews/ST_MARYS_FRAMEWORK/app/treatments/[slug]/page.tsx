import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import SparkAligners from '../../../../content/treatments/spark-aligners.mdx';
import DentalImplants from '../../../../content/treatments/dental-implants.mdx';
import ThreeDPrintedVeneers from '../../../../content/treatments/3d-printed-veneers.mdx';

const treatmentsMap: Record<string, any> = {
  'spark-aligners': SparkAligners,
  'dental-implants': DentalImplants,
  '3d-printed-veneers': ThreeDPrintedVeneers,
};

export async function generateStaticParams() {
  return [
    { slug: 'spark-aligners' },
    { slug: 'dental-implants' },
    { slug: '3d-printed-veneers' },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'treatments', `${slug}.mdx`);
  const md = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(md);
  return {
    title: data.title as string,
    description: data.excerpt as string,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const Content = treatmentsMap[slug];
  if (!Content) {
    notFound();
  }
  const filePath = path.join(process.cwd(), 'content', 'treatments', `${slug}.mdx`);
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
