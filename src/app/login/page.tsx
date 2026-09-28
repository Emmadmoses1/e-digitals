'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-white">E-DIGITALS</h1>
          <span className="text-[#f97316] font-black text-2xl">STUDIO</span>
          <p className="text-[#9ca3af] text-sm mt-2">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-xs font-bold text-[#0a0a0a] uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-[#e5e7eb] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-bold text-[#0a0a0a] uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-[#e5e7eb] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f97316] text-white font-black text-xs tracking-widest uppercase py-4 hover:bg-[#ea6c0a] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
