'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Save, Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role?: string | null
  company?: string | null
  content: string
  rating: number
  published: boolean
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', role: '', company: '', content: '', rating: 5 })

  const load = async () => {
    const res = await fetch('/api/testimonials')
    if (res.ok) setTestimonials(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    if (!form.name || !form.content) return
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, published: true }),
    })
    setForm({ name: '', role: '', company: '', content: '', rating: 5 })
    load()
  }

  const update = async (id: string, data: Partial<Testimonial>) => {
    setSaving(id)
    await fetch(`/api/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <p className="text-sm text-gray-500 mt-1">Manage client testimonials</p>
      </div>

      {/* Add new */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Add Testimonial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="label">Client Name *</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input" placeholder="John Smith" />
          </div>
          <div>
            <label className="label">Role</label>
            <input value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="input" placeholder="CEO" />
          </div>
          <div>
            <label className="label">Company</label>
            <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="input" placeholder="Company name" />
          </div>
          <div>
            <label className="label">Rating</label>
            <select value={form.rating} onChange={e => setForm(p => ({ ...p, rating: Number(e.target.value) }))} className="input">
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="label">Testimonial *</label>
          <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className="input min-h-[100px] resize-y" placeholder="What the client said..." />
        </div>
        <button onClick={create} className="btn-primary text-xs py-2.5">
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Star size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No testimonials yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {testimonials.map(t => (
            <TestimonialRow key={t.id} testimonial={t} saving={saving === t.id}
              onSave={data => update(t.id, data)} onDelete={() => remove(t.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

function TestimonialRow({ testimonial, saving, onSave, onDelete }: {
  testimonial: Testimonial
  saving: boolean
  onSave: (data: Partial<Testimonial>) => void
  onDelete: () => void
}) {
  const [form, setForm] = useState({ ...testimonial })

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < form.rating ? 'text-[#f97316] fill-[#f97316]' : 'text-gray-300'} />
        ))}
      </div>
      <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
        className="input min-h-[80px] resize-y mb-3" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input" placeholder="Name" />
        <input value={form.role || ''} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="input" placeholder="Role" />
        <input value={form.company || ''} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="input" placeholder="Company" />
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))}
            className="w-4 h-4 accent-[#f97316]" />
          Published
        </label>
        <button onClick={() => onSave(form)} disabled={saving} className="btn-outline text-xs py-2 px-4">
          <Save size={13} /> {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1">
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  )
}
