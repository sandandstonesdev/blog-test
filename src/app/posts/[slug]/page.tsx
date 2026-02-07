import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import { matter } from 'vfile-matter';


import { baseMetadata } from '@/config/metadata';
import { NEXT_PUBLIC_APP_URL } from '@/config/config';
import { getCachedPostBySlug, getPostSlugs } from '@/utils/posttFetcher';

type Params = Promise<{ slug: string}>;

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateStaticPaths() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => `/posts/${slug}`);
}


export async function generateMetadata({ params }: { params: Params }) {
  const resolvedParams = await params;
  const post = await getCachedPostBySlug(resolvedParams.slug);
  return {
    ...baseMetadata,
    title: `Post: ${post?.title}`,
    description: `This is the post about ${post?.title} published on ${post?.date}.`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `Post: ${post?.title}`,
      description: `This is the post about ${post?.title} published on ${post?.date}.`,
      url: `${NEXT_PUBLIC_APP_URL}/posts/${post?.slug}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `Preview image for ${post?.title}`,
        },
      ],
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

const Post = async ({ params }: { params: Params }) => {
  const resolvedParams = await params;
  const post = await getCachedPostBySlug(resolvedParams.slug);
  if (!post) {
    return <div>Post not found</div>;
  }

  const processedContent = await unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(() => (tree, file) => {
    matter(file);
  })
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(post.content);

  const frontmatter = (processedContent.data as any).matter || {};
  const contentHtml = processedContent.toString();

  return (
    <section className="section-container">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {/* Post header */}
        <header className="mb-8 text-center border-b pb-6">
          <h1 className="mb-3">{frontmatter.title || post.title}</h1>
          <time className="text-sm text-muted">
            {new Date(frontmatter.date || post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>
        
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </section>
  );
}

export default Post
