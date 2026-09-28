'use client'

import { useEffect, useState } from 'react'
import { Upload, Trash2, Copy, Image as ImageIcon, Check } from 'lucide-react'

interface Media {
  id: string
  filename: string
  url: string
  format?: string | null
  width?: number | null
  height?: number | null
  size?: number | null
  alt?: string | null
  createdAt: string
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')

  const load = async () => {
    const res = await fetch('/api/media')
    if (res.ok) setMedia(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const addByUrl = async () => {
    if (!url) return
    setUploading(true)
    const filename = url.split('/').pop() || 'image'
    await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, filename, alt }),
    })
    setUrl('')
    setAlt('')
    setUploading(false)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this media?')) return
    await fetch(`/api/media/${id}`, { method: 'DELETE' })
    load()
  }

  const copy = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your images and media files</p>
      </div>

      {/* Add by URL */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Add Image by URL</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input value={url} onChange={e => setUrl(e.target.value)} className="input flex-1" placeholder="https://example.com/image.jpg" />
          <input value={alt} onChange={e => setAlt(e.target.value)} className="input md:w-48" placeholder="Alt text" />
          <button onClick={addByUrl} disabled={uploading || !url} className="btn-primary py-3 px-6 whitespace-nowrap">
            <Upload size={15} /> {uploading ? 'Adding...' : 'Add Image'}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Paste any image URL from Cloudinary, Unsplash, or anywhere online</p>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : media.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <ImageIcon size={48} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No media yet. Add images above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map(m => (
            <div key={m.id} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img src={m.url} alt={m.alt || m.filename} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copy(m.url)} className="bg-white text-gray-900 p-2 rounded-lg hover:bg-[#f97316] hover:text-white transition-colors">
                    {copied === m.url ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button onClick={() => remove(m.id)} className="bg-white text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-700 font-medium truncate">{m.filename}</p>
                {m.alt && <p className="text-xs text-gray-400 truncate mt-0.5">{m.alt}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
