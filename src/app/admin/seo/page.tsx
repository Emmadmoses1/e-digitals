'use client'

import { useEffect, useState } from 'react'
import { Save, Globe } from 'lucide-react'

const SEO_FIELDS = [
  { key: 'seo_title', label: 'Default Meta Title', placeholder: 'E-DIGITALS | Brand Identity & Web Development', hint: 'Recommended: 50-60 characters' },
  { key: 'seo_description', label: 'Default Meta Description', placeholder: 'E-DIGITALS is a creative studio...', hint: 'Recommended: 150-160 characters', textarea: true },
  { key: 'seo_keywords', label: 'Meta Keywords', placeholder: 'brand identity, web design, web development', hint: 'Comma separated keywords' },
  { key: 'og_image', label: 'Default OG Image URL', placeholder: 'https://...', hint: 'Recommended: 1200x630px' },
  { key: 'google_analytics', label: 'Google Analytics ID', placeholder: 'G-XXXXXXXXXX' },
  { key: 'google_search_console', label: 'Google Search Console Verification', placeholder: 'verification code' },
]

export default function AdminSEOPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const load = async () => {
    const res = await fetch('/api/settings')
    if (res.ok) {
      const data: { key: string; value: string }[] = await res.json()
      const map: Record<string, string> = {}
      data.forEach(s => { map[s.key] = s.value })
      setSettings(map)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    setSaving(true)
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage meta tags, Open Graph, and analytics</p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col gap-5">
            {SEO_FIELDS.map(f => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                {f.textarea ? (
                  <textarea
                    value={settings[f.key] || ''}
                    onChange={e => setSettings(p => ({ ...p, [f.key]: e.target.value }))}
                    className="input min-h-[100px] resize-y"
                    placeholder={f.placeholder}
                  />
                ) : (
                  <input
                    value={settings[f.key] || ''}
                    onChange={e => setSettings(p => ({ ...p, [f.key]: e.target.value }))}
                    className="input"
                    placeholder={f.placeholder}
                  />
                )}
                {f.hint && <p className="text-xs text-gray-400 mt-1">{f.hint}</p>}
                {settings[f.key] && f.key.includes('title') && (
                  <p className={`text-xs mt-1 ${settings[f.key].length > 60 ? 'text-red-500' : 'text-green-600'}`}>
                    {settings[f.key].length} / 60 characters
                  </p>
                )}
                {settings[f.key] && f.key.includes('description') && (
                  <p className={`text-xs mt-1 ${settings[f.key].length > 160 ? 'text-red-500' : 'text-green-600'}`}>
                    {settings[f.key].length} / 160 characters
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button onClick={save} disabled={saving} className="btn-primary py-3">
              <Save size={15} />
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save SEO Settings'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
