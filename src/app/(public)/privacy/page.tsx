export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-black text-[#0a0a0a] mb-8">Privacy Policy</h1>
        <div className="prose prose-sm text-[#6b7280] space-y-6">
          <p>E-DIGITALS STUDIO respects your privacy. This policy outlines how we collect and use information when you visit our website.</p>
          <h2 className="text-lg font-black text-[#0a0a0a]">Information We Collect</h2>
          <p>We collect information you provide directly, such as when you contact us through our contact form (name, email, message).</p>
          <h2 className="text-lg font-black text-[#0a0a0a]">How We Use Information</h2>
          <p>We use the information to respond to your inquiries and improve our services. We do not sell or share your data with third parties.</p>
          <h2 className="text-lg font-black text-[#0a0a0a]">Contact</h2>
          <p>For privacy concerns, contact us through our contact page.</p>
        </div>
      </div>
    </div>
  )
}
