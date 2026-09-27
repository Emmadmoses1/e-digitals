'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Globe, Trash2, Eye, Plus, X } from 'lucide-react'
import { generateSlug } from '@/lib/utils'
import { PROJECT_CATEGORIES } from '@/types'

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
      if (field === 'title' && isNew) {
        next.slug = generateSlug(value)
      }
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

    const payload = {
      ...form,
      published: publish !== undefined ? publish : form.published,
    }

    try {
      const res = await fetch(
        isNew ? '/api/projects' : `/api/projects/${project.id}`,
        {
          method: isNew ? 'POST' : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to save')
      }

      const saved = await res.json()
      setMessage({ type: 'success', text: 'Project saved successfully.' })

      if (isNew) {
        router.push(`/admin/projects/${saved.id}`)
        router.refresh()
      } else {
        router.refresh()
      }
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-medium">
            {isNew ? 'New Project' : `Edit: ${project?.title}`}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {isNew ? 'Create a new project' : `/work/${form.slug}`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {!isNew && form.published && (
            <a
              href={`/work/${form.slug}`}
              target="_blank"
              className="btn btn-ghost text-xs"
            >
              <Eye size={14} /> Preview
            </a>
          )}
          {!isNew && (
            <button
              onClick={deleteProject}
              disabled={deleting}
              className="btn btn-ghost text-xs text-red-400 hover:text-red-300"
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
          <button
            onClick={() => save(false)}
            disabled={loading}
            className="btn btn-outline text-xs tracking-wider uppercase"
          >
            <Save size={14} />
            {loading ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={() => save(true)}
            disabled={loading}
            className="btn btn-primary text-xs tracking-wider uppercase"
          >
            <Globe size={14} />
            {form.published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm border ${
          message.type === 'success'
            ? 'bg-green-400/10 border-green-400/20 text-green-400'
            : 'bg-red-400/10 border-red-400/20 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Basic info */}
        <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-surface)]">
          <h2 className="text-sm font-medium mb-5 pb-4 border-b border-[var(--color-border)]">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="label">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                className="input"
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="label">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => update('slug', e.target.value)}
                className="input"
                placeholder="project-slug"
              />
            </div>
            <div>
              <label className="label">Category *</label>
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className="input"
              >
                {PROJECT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Client</label>
              <input
                type="text"
                value={form.client}
                onChange={(e) => update('client', e.target.value)}
                className="input"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="label">Year</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                className="input"
                placeholder="2024"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Project URL</label>
              <input
                type="url"
                value={form.projectUrl}
                onChange={(e) => update('projectUrl', e.target.value)}
                className="input"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Services */}
          <div className="mt-4">
            <label className="label">Services</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                className="input flex-1"
                placeholder="Add a service and press Enter"
              />
              <button onClick={addService} className="btn btn-outline px-3">
                <Plus size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.services.map((s: string, i: number) => (
                <span key={i} className="tag flex items-center gap-1.5">
                  {s}
                  <button onClick={() => removeService(i)} className="hover:text-red-400 transition-colors">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="mt-5 flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update('featured', e.target.checked)}
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              <span className="text-sm text-[var(--color-text-secondary)]">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => update('published', e.target.checked)}
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              <span className="text-sm text-[var(--color-text-secondary)]">Published</span>
            </label>
          </div>
        </div>

        {/* Descriptions */}
        <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-surface)]">
          <h2 className="text-sm font-medium mb-5 pb-4 border-b border-[var(--color-border)]">
            Content
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="label">Short Description</label>
              <input
                type="text"
                value={form.shortDescription}
                onChange={(e) => update('shortDescription', e.target.value)}
                className="input"
                placeholder="One line summary"
              />
            </div>
            {[
              { field: 'description', label: 'Overview' },
              { field: 'challenge', label: 'The Challenge' },
              { field: 'strategy', label: 'Strategy' },
              { field: 'solution', label: 'Solution' },
              { field: 'outcome', label: 'Outcome' },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="label">{label}</label>
                <textarea
                  value={form[field as keyof typeof form] as string}
                  onChange={(e) => update(field, e.target.value)}
                  className="input min-h-[100px] resize-y"
                  placeholder={`Write about ${label.toLowerCase()}...`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-surface)]">
          <h2 className="text-sm font-medium mb-5 pb-4 border-b border-[var(--color-border)]">
            Images
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="label">Cover Image URL</label>
              <input
                type="url"
                value={form.coverImage}
                onChange={(e) => update('coverImage', e.target.value)}
                className="input"
                placeholder="https://res.cloudinary.com/..."
              />
              {form.coverImage && (
                <img
                  src={form.coverImage}
                  alt="Cover preview"
                  className="mt-2 h-32 object-cover rounded border border-[var(--color-border)]"
                />
              )}
            </div>
            <div>
              <label className="label">Gallery Images</label>
              <button onClick={addGalleryImage} className="btn btn-outline text-xs mb-3">
                <Plus size={13} /> Add Image URL
              </button>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {form.galleryImages.map((img: string, i: number) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full aspect-video object-cover rounded border border-[var(--color-border)]"
                    />
                    <button
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-surface)]">
          <h2 className="text-sm font-medium mb-5 pb-4 border-b border-[var(--color-border)]">
            SEO
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="label">SEO Title</label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => update('seoTitle', e.target.value)}
                className="input"
                placeholder="SEO title (defaults to project title)"
              />
            </div>
            <div>
              <label className="label">SEO Description</label>
              <textarea
                value={form.seoDescription}
                onChange={(e) => update('seoDescription', e.target.value)}
                className="input min-h-[80px] resize-y"
                placeholder="Meta description for search engines"
              />
            </div>
          </div>
        </div>

        {/* Save bottom */}
        <div className="flex justify-end gap-3 pb-8">
          <button
            onClick={() => save(false)}
            disabled={loading}
            className="btn btn-outline text-xs tracking-wider uppercase"
          >
            <Save size={14} />
            Save Draft
          </button>
          <button
            onClick={() => save(true)}
            disabled={loading}
            className="btn btn-primary text-xs tracking-wider uppercase"
          >
            <Globe size={14} />
            {form.published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}
