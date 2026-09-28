'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Globe, Trash2, Eye, Plus, X } from 'lucide-react'
import { generateSlug } from '@/lib/utils'
import { PROJECT_CATEGORIES } from '@/types'

const input = "w-full border border-[#e5e7eb] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316]"
const label = "block text-xs font-bold uppercase tracking-widest text-[#0a0a0a] mb-2"
const section = "bg-white border border-[#f3f4f6] p-6 mb-6"

interface ProjectEditorProps {
  project?: any
  isNew?: boolean
}

export default function ProjectEditor({ project, isNew = false }: ProjectEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [serviceInput, setServiceInput] = useState('')

  const [form, setForm] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    category: project?.category || PROJECT_CATEGORIES[0],
    client: project?.client || '',
    year: project?.year || new Date().getFullYear().toString(),
    services: project?.services || [],
    shortDescription: project?.shortDescription || '',
    description: project?.description || '',
    challenge: project?.challenge || '',
    strategy: project?.strategy || '',
    solution: project?.solution || '',
    outcome: project?.outcome || '',
    coverImage: project?.coverImage || '',
    galleryImages: project?.galleryImages || [],
    projectUrl: project?.projectUrl || '',
    featured: project?.featured || false,
    published: project?.published || false,
    seoTitle: project?.seoTitle || '',
    seoDescription: project?.seoDescription || '',
  })

  const update = (field: string, value: any) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'title' && isNew) next.slug = generateSlug(value)
      return next
    })
  }

  const addService = () => {
    if (!serviceInput.trim()) return
    update('services', [...form.services, serviceInput.trim()])
    setServiceInput('')
  }

  const removeService = (i: number) => {
    update('services', form.services.filter((_: string, idx: number) => idx !== i))
  }

  const addGalleryImage = () => {
    const url = prompt('Enter image URL:')
    if (url) update('galleryImages', [...form.galleryImages, url])
  }

  const removeGalleryImage = (i: number) => {
    update('galleryImages', form.galleryImages.filter((_: string, idx: number) => idx !== i))
  }

  const save = async (publish?: boolean) => {
    setLoading(true)
    setMessage(null)
    const payload = { ...form, published: publish !== undefined ? publish : form.published }
    try {
      const res = await fetch(
        isNew ? '/api/projects' : `/api/projects/${project.id}`,
        { method: isNew ? 'POST' : 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      )
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed to save') }
      const saved = await res.json()
      setMessage({ type: 'success', text: 'Project saved successfully.' })
      if (isNew) { router.push(`/admin/projects/${saved.id}`); router.refresh() } else { router.refresh() }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async () => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    setDeleting(true)
    try {
      await fetch(`/api/projects/${project.id}`, { method: 'DELETE' })
      router.push('/admin/projects')
      router.refresh()
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete project.' })
      setDeleting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0a0a0a]">
            {isNew ? 'New Project' : `Edit: ${project?.title}`}
          </h1>
          <p className="text-sm text-[#9ca3af] mt-1">
            {isNew ? 'Create a new project' : `/work/${form.slug}`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {!isNew && form.published && (
            <a href={`/work/${form.slug}`} target="_blank"
              className="flex items-center gap-1 border border-[#e5e7eb] text-xs font-bold uppercase tracking-widest px-4 py-2 hover:border-[#0a0a0a] transition-colors">
              <Eye size={13} /> Preview
            </a>
          )}
          {!isNew && (
            <button onClick={deleteProject} disabled={deleting}
              className="flex items-center gap-1 border border-red-200 text-red-500 text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-red-50 transition-colors">
              <Trash2 size={13} /> Delete
            </button>
          )}
          <button onClick={() => save(false)} disabled={loading}
            className="flex items-center gap-1 border border-[#e5e7eb] text-xs font-bold uppercase tracking-widest px-4 py-2 hover:border-[#0a0a0a] transition-colors">
            <Save size={13} /> {loading ? 'Saving...' : 'Save Draft'}
          </button>
          <button onClick={() => save(true)} disabled={loading}
            className="flex items-center gap-1 bg-[#f97316] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-[#ea6c0a] transition-colors">
            <Globe size={13} /> {form.published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 px-4 py-3 text-sm border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
          {message.text}
        </div>
      )}

      <div className={section}>
        <h2 className="text-sm font-black text-[#0a0a0a] mb-5 pb-4 border-b border-[#f3f4f6]">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={label}>Title *</label>
            <input type="text" value={form.title} onChange={e => update('title', e.target.value)} className={input} placeholder="Project title" />
          </div>
          <div>
            <label className={label}>Slug</label>
            <input type="text" value={form.slug} onChange={e => update('slug', e.target.value)} className={input} placeholder="project-slug" />
          </div>
          <div>
            <label className={label}>Category *</label>
            <select value={form.category} onChange={e => update('category', e.target.value)} className={input}>
              {PROJECT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Client</label>
            <input type="text" value={form.client} onChange={e => update('client', e.target.value)} className={input} placeholder="Client name" />
          </div>
          <div>
            <label className={label}>Year</label>
            <input type="text" value={form.year} onChange={e => update('year', e.target.value)} className={input} placeholder="2024" />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Project URL</label>
            <input type="url" value={form.projectUrl} onChange={e => update('projectUrl', e.target.value)} className={input} placeholder="https://example.com" />
          </div>
        </div>

        <div className="mt-4">
          <label className={label}>Services</label>
          <div className="flex gap-2 mb-2">
            <input type="text" value={serviceInput} onChange={e => setServiceInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addService())}
              className={input + ' flex-1'} placeholder="Add a service and press Enter" />
            <button onClick={addService} className="border border-[#e5e7eb] px-3 hover:border-[#f97316] transition-colors">
              <Plus size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.services.map((s: string, i: number) => (
              <span key={i} className="flex items-center gap-1.5 bg-[#f3f4f6] text-xs font-bold px-3 py-1">
                {s}
                <button onClick={() => removeService(i)} className="hover:text-red-500 transition-colors"><X size={10} /></button>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => update('featured', e.target.checked)} className="w-4 h-4 accent-[#f97316]" />
            <span className="text-sm font-medium text-[#0a0a0a]">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => update('published', e.target.checked)} className="w-4 h-4 accent-[#f97316]" />
            <span className="text-sm font-medium text-[#0a0a0a]">Published</span>
          </label>
        </div>
      </div>

      <div className={section}>
        <h2 className="text-sm font-black text-[#0a0a0a] mb-5 pb-4 border-b border-[#f3f4f6]">Content</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className={label}>Short Description</label>
            <input type="text" value={form.shortDescription} onChange={e => update('shortDescription', e.target.value)} className={input} placeholder="One line summary" />
          </div>
          {[
            { field: 'description', label: 'Overview' },
            { field: 'challenge', label: 'The Challenge' },
            { field: 'strategy', label: 'Strategy' },
            { field: 'solution', label: 'Solution' },
            { field: 'outcome', label: 'Outcome' },
          ].map(({ field, label: lbl }) => (
            <div key={field}>
              <label className={label}>{lbl}</label>
              <textarea value={form[field as keyof typeof form] as string} onChange={e => update(field, e.target.value)}
                className={input + ' min-h-[100px] resize-y'} placeholder={`Write about ${lbl.toLowerCase()}...`} />
            </div>
          ))}
        </div>
      </div>

      <div className={section}>
        <h2 className="text-sm font-black text-[#0a0a0a] mb-5 pb-4 border-b border-[#f3f4f6]">Images</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className={label}>Cover Image URL</label>
            <input type="url" value={form.coverImage} onChange={e => update('coverImage', e.target.value)} className={input} placeholder="https://..." />
            {form.coverImage && <img src={form.coverImage} alt="Cover preview" className="mt-2 h-32 object-cover border border-[#f3f4f6]" />}
          </div>
          <div>
            <label className={label}>Gallery Images</label>
            <button onClick={addGalleryImage} className="flex items-center gap-1 border border-[#e5e7eb] text-xs font-bold uppercase tracking-widest px-4 py-2 mb-3 hover:border-[#f97316] transition-colors">
              <Plus size={13} /> Add Image URL
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {form.galleryImages.map((img: string, i: number) => (
                <div key={i} className="relative group">
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full aspect-video object-cover border border-[#f3f4f6]" />
                  <button onClick={() => removeGalleryImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={section}>
        <h2 className="text-sm font-black text-[#0a0a0a] mb-5 pb-4 border-b border-[#f3f4f6]">SEO</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className={label}>SEO Title</label>
            <input type="text" value={form.seoTitle} onChange={e => update('seoTitle', e.target.value)} className={input} placeholder="SEO title" />
          </div>
          <div>
            <label className={label}>SEO Description</label>
            <textarea value={form.seoDescription} onChange={e => update('seoDescription', e.target.value)} className={input + ' min-h-[80px] resize-y'} placeholder="Meta description" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pb-8">
        <button onClick={() => save(false)} disabled={loading}
          className="flex items-center gap-1 border border-[#e5e7eb] text-xs font-bold uppercase tracking-widest px-5 py-3 hover:border-[#0a0a0a] transition-colors">
          <Save size={13} /> Save Draft
        </button>
        <button onClick={() => save(true)} disabled={loading}
          className="flex items-center gap-1 bg-[#f97316] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 hover:bg-[#ea6c0a] transition-colors">
          <Globe size={13} /> {form.published ? 'Update' : 'Publish'}
        </button>
      </div>
    </div>
  )
}
