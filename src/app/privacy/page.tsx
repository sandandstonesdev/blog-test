import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | DevTestBlog',
  description: 'Privacy policy and cookie usage information',
}

export default function PrivacyPage() {
  return (
    <div className="section-container max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-muted mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">What We Collect</h2>
          <p className="mb-3">
            This blog collects minimal analytics data to understand how visitors use the site:
          </p>
          <ul className="list-disc pl-6 mb-3">
            <li>Browser type and pages visited</li>
            <li>General location (country/city level)</li>
            <li>Referring website</li>
          </ul>
          <p>We do not collect personal information.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
          <p className="mb-3">
            We use two types of cookies:
          </p>
          <p className="mb-2"><strong>Essential:</strong> Remember your cookie preferences</p>
          <p className="mb-3"><strong>Analytics (Optional):</strong> Anonymous usage statistics</p>
          <p>You control these through the banner on your first visit.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
          <ul className="list-disc pl-6">
            <li>Decline optional cookies</li>
            <li>Change preferences anytime</li>
            <li>Request information about collected data</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Third-Party Services</h2>
          <p>
            If enabled, we use Google Analytics for anonymous visitor statistics. 
            They have their own privacy policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p>
            Questions? Contact us via the About page.
          </p>
        </section>
      </div>
    </div>
  )
}
