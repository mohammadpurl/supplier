'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  CubeIcon,
  TruckIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'داشبورد', href: '/', icon: HomeIcon },
  { name: 'محصولات', href: '/products', icon: CubeIcon },
  { name: 'سفارشات', href: '/orders', icon: DocumentTextIcon },
  { name: 'حمل و نقل', href: '/shipping', icon: TruckIcon },
  { name: 'مشتریان', href: '/customers', icon: UserGroupIcon },
  { name: 'گزارشات', href: '/reports', icon: ChartBarIcon },
  { name: 'تنظیمات', href: '/settings', icon: Cog6ToothIcon },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleCloseSidebar = () => setIsMobileMenuOpen(false)

  return (
    <>
      {/* Mobile menu */}
      <div className="lg:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">باز کردن منو</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-l border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">داشبورد تامین‌کنندگان</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      // className={`ml-3 h-6 w-6 flex-shrink-0 text-iconPrimary-100`}
                      aria-hidden="true"
                      className={`ml-3 h-6 w-6 flex-shrink-0 ${
                        isActive ? 'text-iconPrimary-100' : 'text-iconPrimary-50 group-hover:text-iconPrimary-100'
                      }`}

                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          <div className="fixed inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white">
            <div className="flex min-h-0 flex-1 flex-col border-l border-gray-200 bg-white">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <h1 className="text-xl font-bold text-gray-900">داشبورد تامین‌کنندگان</h1>
                </div>
                <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`ml-3 h-6 w-6 flex-shrink-0 text-iconPrimary-100`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
            <button
              className="block md:hidden absolute top-4 left-4 z-50"
              onClick={handleCloseSidebar}
              aria-label="بستن سایدبار"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
} 