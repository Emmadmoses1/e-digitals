'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inp = "w-full border border-[#e5e7eb] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316]"
  const lbl = "block text-xs font-bold uppercase tracking-widest text-[#0a0a0a] mb-2"

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-5xl font-black text-[#0a0a0a]">Contact</h1>
        </div>
        {status === 'sent' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 text-center">
            <p className="font-black text-lg mb-2">Message Sent!</p>
            <p className="text-sm">We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {status === 'error' && <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">Something went wrong. Please try again.</p>}
            <div><label className={lbl}>Name</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} /></div>
            <div><label className={lbl}>Email</label><input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inp} /></div>
            <div><label className={lbl}>Subject</label><input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className={inp} /></div>
            <div><label className={lbl}>Message</label><textarea required rows={6} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={inp + ' resize-y'} /></div>
            <button type="submit" disabled={status === 'sending'} className="w-full bg-[#f97316] text-white font-black text-xs uppercase tracking-widest py-4 hover:bg-[#ea6c0a] transition-colors disabled:opacity-50">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
