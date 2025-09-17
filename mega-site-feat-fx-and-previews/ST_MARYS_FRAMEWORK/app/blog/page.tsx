import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export const metadata = {
  title: 'Blog',
  description: 'Explore our latest articles and news'
};

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), 'ST_MARYS_FRAMEWORK', 'content', 'blog');
  const filenames = fs.readdirSync(postsDirectory).filter((fn) => fn.endsWith('.mdx'));

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      date: new Date(data.date)
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <main className="prose mx-auto max-w-screen-md px-4 py-8">
      <h1>Blog</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-gray-500">
              {post.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="mt-2">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-primary underline mt-2 inline-block">
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
