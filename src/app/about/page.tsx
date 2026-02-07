import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | My Blog",
  description: "Learn more about me and this blog",
  openGraph: {
    title: "About | My Blog",
    description: "Learn more about me and this blog",
    url: '/about',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About page preview',
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const About = () => {
  return (
    <section className="section-container">
      <h2 className="heading-responsive mb-6">About</h2>
      <p className="text-base sm:text-lg leading-relaxed text-main">
        This is test website to exercise blog deployment. In future, I will add more features and content to make it a comprehensive blogging platform.
      </p>
    </section>
  )
}

export default About
