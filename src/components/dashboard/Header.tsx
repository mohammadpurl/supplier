'use server'


import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import HeadeUserSession from './Heade-user-session'
export default async function Header() {

  


  return (
    <header className=" top-0 z-40 w-full bg-white shadow">
      <div className="container mx-auto px-10 sm:px-32">
        <div className="flex h-16 items-center justify-between">
          {/* Left side */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">داشبورد تامین‌کنندگان</h1>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4  space-x-4">
            {/* Notifications */}
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span className="sr-only">مشاهده اعلان‌ها</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>           
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span className="sr-only">مشاهده اعلان‌ها</span>
              <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
            </button>   
            {/* Profile dropdown */}
            <HeadeUserSession />
          </div>
        </div>
      </div>
    </header>
  )

} 
