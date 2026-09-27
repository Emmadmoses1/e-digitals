'use client'

import { useState } from 'react'
import PageTransition from '@/components/animations/PageTransition'
import FadeUp from '@/components/animations/FadeUp'
import { PROJECT_TYPES, BUDGET_RANGES } from '@/types'
import { Send, Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', company: '',
    projectType: '', budget: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again or email me directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <section className="pt-40 pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left */}
            <div className="lg:col-span-5">
              <FadeUp>
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                  Contact
                </span>
                <h1 className="text-heading-xl mt-2 mb-6">
                  Let&apos;s build something
                  <br />
                  <span className="text-[var(--color-text-secondary)]">remarkable.</span>
                </h1>
                <p className="text-body text-[var(--color-text-secondary)] mb-10">
                  Have a project in mind? Tell me about it. I&apos;d love to hear
                  about your brand, your goals, and how I can help.
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:hello@e-digitals.com"
                    className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <Mail size={16} className="text-[var(--color-accent)]" />
                    hello@e-digitals.com
                  </a>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                    <MapPin size={16} className="text-[var(--color-accent)]" />
                    Nigeria
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.2}>
                {sent ? (
                  <div className="border border-green-500/30 rounded-lg p-10 text-center bg-green-400/5">
                    <p className="text-lg font-medium mb-2">Message sent.</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label" htmlFor="name">Name *</label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          className="input"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="label" htmlFor="email">Email *</label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className="input"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label" htmlFor="company">Company</label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) => update('company', e.target.value)}
                        className="input"
                        placeholder="Your company (optional)"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label" htmlFor="projectType">Project Type</label>
                        <select
                          id="projectType"
                          value={form.projectType}
                          onChange={(e) => update('projectType', e.target.value)}
                          className="input"
                        >
                          <option value="">Select type</option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label" htmlFor="budget">Budget Range</label>
                        <select
                          id="budget"
                          value={form.budget}
                          onChange={(e) => update('budget', e.target.value)}
                          className="input"
                        >
                          <option value="">Select budget</option>
                          {BUDGET_RANGES.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="label" htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        className="input min-h-[140px] resize-y"
                        placeholder="Tell me about your project, goals and timeline..."
                        required
                        minLength={10}
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary text-xs tracking-wider uppercase self-start disabled:opacity-50"
                    >
                      <Send size={13} />
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
