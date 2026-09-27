import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-8xl font-medium text-[var(--color-border-light)] mb-6">404</p>
        <h1 className="text-heading-lg mb-4">Page not found</h1>
        <p className="text-body text-[var(--color-text-secondary)] mb-8 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary text-xs tracking-wider uppercase">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
