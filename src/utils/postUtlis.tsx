import path from "path"
import fs from "fs";
import matter from "gray-matter";
import { unstable_cache } from 'next/cache';

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");
const CACHE_CONFIG = {
  TAGS: { ALL_POSTS: 'posts', SINGLE_POST: 'post' },
  REVALIDATE: 3600,
} as const;

interface PostData {
  slug: string
  title: string
  date: string
  content: string
}

function getPostBySlug(slug: string): PostData | null {
  if (!slug) return null;

  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      content,
    };
  } catch (error) {
    console.error(`Failed to read post ${slug}:`, error);
    return null;
  }
}

export function getPostSlugs(): string[] {
  const filenames = fs.readdirSync(POSTS_DIRECTORY);
  return filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => filename.replace(/\.mdx$/, ""));
}

function getPostData(): PostData[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is PostData => post !== null);
}

export const getCachedPostData = unstable_cache(
  async (): Promise<PostData[]> => getPostData(),
  [CACHE_CONFIG.TAGS.ALL_POSTS],
  { 
    revalidate: CACHE_CONFIG.REVALIDATE,
    tags: [CACHE_CONFIG.TAGS.ALL_POSTS],
  }
);

export const getCachedPostBySlug = unstable_cache(
  async (slug: string): Promise<PostData | null> => getPostBySlug(slug),
  [CACHE_CONFIG.TAGS.SINGLE_POST],
  { 
    revalidate: CACHE_CONFIG.REVALIDATE,
    tags: [CACHE_CONFIG.TAGS.SINGLE_POST],
  }
);