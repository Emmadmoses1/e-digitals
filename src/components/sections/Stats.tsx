import { Users, Briefcase, Star, Award } from 'lucide-react'

const stats = [
  { icon: <Users size={28} />, number: '50+', label: 'Happy Clients' },
  { icon: <Briefcase size={28} />, number: '120+', label: 'Projects Done' },
  { icon: <Star size={28} />, number: '5.0', label: 'Average Rating' },
  { icon: <Award size={28} />, number: '5+', label: 'Years Experience' },
]

export default function Stats() {
  return (
    <section className="bg-[#0a0a0a] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-[#f97316] flex justify-center mb-3">{s.icon}</div>
            <p className="text-4xl font-black text-white mb-1">{s.number}</p>
            <p className="text-xs text-[#6b7280] font-medium tracking-widest uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
