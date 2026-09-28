import { prisma } from '@/lib/prisma'
import { Mail, MailOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])

  return (
    <div>
      <h1 className="text-2xl font-black text-[#0a0a0a] mb-8">Messages</h1>

      {messages.length === 0 ? (
        <div className="bg-white border border-[#f3f4f6] p-12 text-center">
          <p className="text-[#9ca3af]">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`bg-white border p-6 ${m.status === 'new' ? 'border-[#f97316]/30' : 'border-[#f3f4f6]'}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  {m.status === 'new'
                    ? <Mail size={16} className="text-[#f97316] shrink-0" />
                    : <MailOpen size={16} className="text-[#9ca3af] shrink-0" />}
                  <div>
                    <p className="font-black text-[#0a0a0a]">{m.name}</p>
                    <p className="text-xs text-[#9ca3af]">{m.email}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[10px] px-2 py-1 font-bold border ${m.status === 'new' ? 'border-[#f97316]/30 text-[#f97316] bg-orange-50' : 'border-[#f3f4f6] text-[#9ca3af]'}`}>
                    {m.status}
                  </span>
                  <p className="text-[10px] text-[#9ca3af] mt-1">{new Date(m.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {m.subject && <p className="text-sm font-bold text-[#0a0a0a] mb-2">{m.subject}</p>}
              <p className="text-sm text-[#6b7280] leading-relaxed">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
