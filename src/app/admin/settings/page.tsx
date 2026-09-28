'use client'

import { useEffect, useState } from 'react'
import { Save, Settings } from 'lucide-react'

interface Setting { key: string; value: string }

const SETTING_LABELS: Record<string, string> = {
  site_name: 'Site Name',
  site_tagline: 'Site Tagline',
  contact_email: 'Contact Email',
  instagram_url: 'Instagram URL',
  twitter_url: 'Twitter / X URL',
  linkedin_url: 'LinkedIn URL',
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const load = async () => {
    const res = await fetch('/api/settings')
    if (res.ok) {
      const data: Setting[] = await res.json()
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
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your site information and social links</p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col gap-5">
            {Object.entries(SETTING_LABELS).map(([key, label]) => (
              <div key={key}>
                <label className="label">{label}</label>
                <input
                  value={settings[key] || ''}
                  onChange={e => setSettings(p => ({ ...p, [key]: e.target.value }))}
                  className="input"
                  placeholder={label}
                  type={key.includes('email') ? 'email' : key.includes('url') ? 'url' : 'text'}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button onClick={save} disabled={saving} className="btn-primary py-3">
              <Save size={15} />
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
