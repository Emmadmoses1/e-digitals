export const metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-black text-[#0a0a0a] mb-8">Terms of Service</h1>
        <div className="prose prose-sm text-[#6b7280] space-y-6">
          <p>By using E-DIGITALS STUDIO's website and services, you agree to these terms.</p>
          <h2 className="text-lg font-black text-[#0a0a0a]">Services</h2>
          <p>E-DIGITALS STUDIO provides brand identity design and web development services. Project terms are defined in individual client agreements.</p>
          <h2 className="text-lg font-black text-[#0a0a0a]">Intellectual Property</h2>
          <p>All work produced by E-DIGITALS STUDIO remains our property until full payment is received, at which point ownership transfers to the client as agreed.</p>
          <h2 className="text-lg font-black text-[#0a0a0a]">Contact</h2>
          <p>For questions about these terms, contact us through our contact page.</p>
        </div>
      </div>
    </div>
  )
}
