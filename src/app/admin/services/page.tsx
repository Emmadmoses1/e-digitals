'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Save } from 'lucide-react'

const ICONS = ['Palette', 'Monitor', 'Code', 'Globe', 'Layers', 'Zap', 'Star', 'Heart']

interface Service {
  id: string
  title: string
  description?: string | null
  icon?: string | null
  order: number
  published: boolean
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [newService, setNewService] = useState({ title: '', description: '', icon: 'Palette', order: 0 })

  const load = async () => {
    const res = await fetch('/api/services')
    const data = await res.json()
    setServices(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    if (!newService.title) return
    await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newService, published: true }),
    })
    setNewService({ title: '', description: '', icon: 'Palette', order: 0 })
    load()
  }

  const update = async (id: string, data: Partial<Service>) => {
    setSaving(id)
    await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-medium">Services</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage your service offerings</p>
      </div>

      {/* Add new */}
      <div className="border border-[var(--color-border)] rounded-lg p-5 bg-[var(--color-surface)] mb-6">
        <h2 className="text-sm font-medium mb-4">Add Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={newService.title}
            onChange={(e) => setNewService((p) => ({ ...p, title: e.target.value }))}
            className="input"
            placeholder="Service title"
          />
          <select
            value={newService.icon}
            onChange={(e) => setNewService((p) => ({ ...p, icon: e.target.value }))}
            className="input"
          >
            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <textarea
            value={newService.description}
            onChange={(e) => setNewService((p) => ({ ...p, description: e.target.value }))}
            className="input md:col-span-2 min-h-[80px] resize-y"
            placeholder="Service description"
          />
        </div>
        <button onClick={create} className="btn btn-primary text-xs tracking-wider uppercase mt-3">
          <Plus size={14} /> Add Service
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {services.map((s) => (
            <ServiceRow
              key={s.id}
              service={s}
              saving={saving === s.id}
              onSave={(data) => update(s.id, data)}
              onDelete={() => remove(s.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ServiceRowProps {
  service: Service
  saving: boolean
  onSave: (data: Partial<Service>) => void
  onDelete: () => void
}

function ServiceRow({ service, saving, onSave, onDelete }: ServiceRowProps) {
  const [form, setForm] = useState<Service>({ ...service })

  return (
    <div className="border border-[var(--color-border)] rounded-lg p-5 bg-[var(--color-surface)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          className="input"
          placeholder="Title"
        />
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--color-text-secondary)]">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
              className="w-4 h-4 accent-[var(--color-accent)]"
            />
            Published
          </label>
        </div>
        <textarea
          value={form.description || ''}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          className="input md:col-span-2 min-h-[80px] resize-y"
          placeholder="Description"
        />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="btn btn-outline text-xs"
        >
          <Save size={13} /> {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onDelete}
          className="btn btn-ghost text-xs text-red-400 hover:text-red-300"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  )
}
