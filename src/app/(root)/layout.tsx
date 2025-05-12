import { ReactNode } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex ">
        <Sidebar />
        <div className="flex-1 pr-0 lg:pr-64">
          <Header />
          <main className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto  px-4 sm:px-6 lg:px-8 py-4 border-primary-100 bg-white ">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 