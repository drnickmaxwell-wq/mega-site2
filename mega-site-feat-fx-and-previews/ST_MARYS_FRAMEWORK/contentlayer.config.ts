import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc: any) => doc.slug ?? doc._raw.flattenedPath.replace(/^.*\//, ''),
  },
  url: {
    type: 'string',
    resolve: (doc: any) => {
      if (doc._id.startsWith('treatments/')) return `/treatments/${doc.slug}`;
      if (doc._id.startsWith('blog/')) return `/blog/${doc.slug}`;
      if (doc._id.startsWith('leaflets/')) return `/leaflets/${doc.slug}`;
      return `/${doc.slug}`;
    },
  },
};

export const Treatment = defineDocumentType(() => ({
  name: 'Treatment',
  filePathPattern: 'treatments/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    category: { type: 'string', required: false },
    heroImage: { type: 'string', required: false },
  },
  computedFields,
}));

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    heroImage: { type: 'string', required: false },
    author: { type: 'string', required: false },
  },
  computedFields,
}));

export const Leaflet = defineDocumentType(() => ({
  name: 'Leaflet',
  filePathPattern: 'leaflets/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Treatment, Blog, Leaflet],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
