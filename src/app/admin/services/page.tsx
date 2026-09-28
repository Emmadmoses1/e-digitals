'use client'
import { useEffect, useState } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string | null
  published: boolean
  order: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState({ title: '', description: '', published: true, order: 0 })
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch('/api/services')
    const data = await res.json()
    setServices(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function startNew() {
    setEditing({ id: '', title: '', description: '', published: true, order: services.length })
    setForm({ title: '', description: '', published: true, order: services.length })
  }

  function startEdit(s: Service) {
    setEditing(s)
    setForm({ title: s.title, description: s.description ?? '', published: s.published, order: s.order })
  }

  async function save() {
    setSaving(true)
    const method = editing?.id ? 'PATCH' : 'POST'
    const url = editing?.id ? `/api/services/${editing.id}` : '/api/services'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setEditing(null)
    setSaving(false)
    load()
  }

  async function remove(id: string) {
    if (!confirm('Delete this service?')) return
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-[#0a0a0a]">Services</h1>
        <button onClick={startNew}
          className="flex items-center gap-2 bg-[#f97316] text-white text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-[#ea6c0a] transition-colors">
          <Plus size={14} /> New Service
        </button>
      </div>

      {editing !== null && (
        <div className="bg-white border border-[#f3f4f6] p-6 mb-6">
          <h2 className="font-black text-[#0a0a0a] mb-4">{editing.id ? 'Edit Service' : 'New Service'}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#0a0a0a] mb-2">Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full border border-[#e5e7eb] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#0a0a0a] mb-2">Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3} className="w-full border border-[#e5e7eb] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316]" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
              <label htmlFor="pub" className="text-sm font-medium text-[#0a0a0a]">Published</label>
            </div>
            <div className="flex gap-3">
              <button onClick={save} disabled={saving}
                className="bg-[#f97316] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#ea6c0a] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setEditing(null)}
                className="border border-[#e5e7eb] text-xs font-bold uppercase tracking-widest px-6 py-3 hover:border-[#0a0a0a] transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-[#9ca3af] text-sm">Loading...</p>
      ) : services.length === 0 ? (
        <div className="bg-white border border-[#f3f4f6] p-12 text-center">
          <p className="text-[#9ca3af]">No services yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#f3f4f6] divide-y divide-[#f3f4f6]">
          {services.map(s => (
            <div key={s.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-bold text-[#0a0a0a]">{s.title}</p>
                <p className="text-xs text-[#9ca3af] mt-1">{s.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-1 font-bold border ${s.published ? 'border-green-500/30 text-green-600 bg-green-50' : 'border-[#f3f4f6] text-[#9ca3af]'}`}>
                  {s.published ? 'Published' : 'Draft'}
                </span>
                <button onClick={() => startEdit(s)} className="text-[#9ca3af] hover:text-[#f97316] transition-colors"><Pencil size={14} /></button>
                <button onClick={() => remove(s.id)} className="text-[#9ca3af] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
