import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-[#f97316] font-black text-6xl mb-4">404</p>
        <h1 className="text-2xl font-black text-[#0a0a0a] mb-2">Page Not Found</h1>
        <p className="text-[#9ca3af] mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/" className="bg-[#f97316] text-white font-black text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#ea6c0a] transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
