import { getCachedPostData } from '@/utils/postUtlis'
import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts | My Blog",
  description: "Browse all blog posts",
  openGraph: {
    title: "Posts | My Blog",
    description: "Browse all blog posts",
    url: '/posts',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Posts page preview',
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const Posts = async () => {
  const posts = await getCachedPostData();
  
  return (
    <section className="section-container">
      <h2 className="heading-responsive mb-8">Posts</h2>
      
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug} className="group">
            <Link 
              href={`/posts/${post.slug}`}
              className="link-card"
            >
              <h3 className="link-card-title">
                {post.title}
              </h3>
              {post.date && (
                <time className="text-sm text-muted">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Posts