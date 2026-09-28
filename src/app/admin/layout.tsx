import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Get current path from headers
  const { headers } = await import('next/headers')
  const headersList = await headers()
  const pathname = headersList.get('x-invoke-path') || ''

  // Only protect non-login pages
  if (!session && !pathname.includes('/admin/login')) {
    redirect('/admin/login')
  }

  // If logged in and trying to access login, go to dashboard
  if (session && pathname.includes('/admin/login')) {
    redirect('/admin')
  }

  if (!session) {
    return <>{children}</>
  }

  const user = {
    name: session.user?.name ?? null,
    email: session.user?.email ?? null,
  }

  return (
    <div className="min-h-screen bg-white flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={user} />
        <main className="flex-1 p-6 md:p-8 overflow-auto bg-[#f9fafb]">
          {children}
        </main>
      </div>
    </div>
  )
}
