import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from '@/providers/auth-provider'
import { Notifications } from './_components/notification/notifications'

const vazirmatn = Vazirmatn({ subsets: ['arabic'] })

export const metadata: Metadata = {
  title: 'داشبورد تامین‌کنندگان',
  description: 'داشبورد مدیریتی برای تامین‌کنندگان',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased grainy">
      <Notifications />
      <AuthProvider>
        {children}
      </AuthProvider>
      </body>
    </html>
  )
} 