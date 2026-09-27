'use client'

import { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'
import { Trash2, Mail, MailOpen } from 'lucide-react'

const STATUS_OPTIONS = ['new', 'read', 'replied', 'archived']

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any | null>(null)

  const load = async () => {
    const res = await fetch('/api/messages')
    const data = await res.json()
    setMessages(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
    if (selected?.id === id) setSelected((p: any) => ({ ...p, status }))
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`/api/messages/${id}`, { method: 'DELETE' })
    setSelected(null)
    load()
  }

  const openMessage = (msg: any) => {
    setSelected(msg)
    if (msg.status === 'new') updateStatus(msg.id, 'read')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-medium">Messages</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          {messages.filter((m) => m.status === 'new').length} unread
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-[var(--color-text-muted)]">Loading...</p>
          ) : messages.length === 0 ? (
            <p className="p-6 text-sm text-[var(--color-text-muted)]">No messages yet.</p>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={`w-full text-left px-4 py-3 hover:bg-[var(--color-bg-tertiary)] transition-colors ${
                    selected?.id === msg.id ? 'bg-[var(--color-bg-tertiary)]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-medium truncate ${
                      msg.status === 'new' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                    }`}>
                      {msg.name}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {msg.status === 'new' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        msg.status === 'new'
                          ? 'border-[var(--color-accent)]/30 text-[var(--color-accent)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">{msg.email}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{formatDate(msg.createdAt)}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
          {!selected ? (
            <div className="flex items-center justify-center h-64 text-[var(--color-text-muted)]">
              <div className="text-center">
                <Mail size={24} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a message to read</p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-[var(--color-border)]">
                <div>
                  <h2 className="font-medium">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-[var(--color-accent)] hover:underline">
                    {selected.email}
                  </a>
                  {selected.company && (
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{selected.company}</p>
                  )}
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{formatDate(selected.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    title="Reply"
                  >
                    <MailOpen size={16} />
                  </a>
                  <button
                    onClick={() => deleteMessage(selected.id)}
                    className="p-2 text-[var(--color-text-muted)] hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                {selected.projectType && (
                  <div>
                    <p className="label">Project Type</p>
                    <p className="text-[var(--color-text-secondary)]">{selected.projectType}</p>
                  </div>
                )}
                {selected.budget && (
                  <div>
                    <p className="label">Budget</p>
                    <p className="text-[var(--color-text-secondary)]">{selected.budget}</p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <p className="label mb-2">Message</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="label mb-2">Status</p>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`text-xs px-3 py-1.5 rounded border transition-colors capitalize ${
                        selected.status === s
                          ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-light)]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
