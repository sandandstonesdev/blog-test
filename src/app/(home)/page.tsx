import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'This is home page',
  openGraph: {
    title: 'Home',
    description: 'This is home page',
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Home page preview',
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

const Homepage = () => {
  return (
    <section className="section-container">
      <h2 className="heading-responsive mb-6">Home</h2>
      <p className="text-base sm:text-lg leading-relaxed text-main">
        Welcome to my blog! Here, I share articles, tutorials, and updates on a variety of topics. 
        Whether you're a seasoned professional or just starting out, my content is designed to inform and inspire.
        Stay tuned for regular updates and feel free to explore my posts section for more in-depth reads.
      </p>
    </section>
  )
}

export default Homepage
