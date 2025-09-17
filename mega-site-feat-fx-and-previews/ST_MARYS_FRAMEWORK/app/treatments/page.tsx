import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Treatments',
  description: 'Our dental treatments',
};

interface TreatmentMeta {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
}

async function getTreatments(): Promise<TreatmentMeta[]> {
  const dir = path.join(process.cwd(), 'content', 'treatments');
  const files = fs.readdirSync(dir);
  const posts = files.map((file) => {
    const md = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data } = matter(md);
    return {
      title: data.title as string,
      slug: data.slug as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
    } as TreatmentMeta;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function Page() {
  const treatments = await getTreatments();
  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Treatments</h1>
      <ul className="space-y-4">
        {treatments.map((post) => (
          <li key={post.slug} className="border rounded-md p-4">
            <h2 className="text-xl font-bold">
              <Link href={`/treatments/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
