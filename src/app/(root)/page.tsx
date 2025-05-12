import {
  CurrencyDollarIcon,
  CubeIcon,
  TruckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'تعداد کل محصولات',
    value: '۱٬۲۳۴',
    icon: CubeIcon,
    change: '+۱۲٪',
    changeType: 'positive',
  },
  {
    name: 'سفارشات فعال',
    value: '۵۶',
    icon: TruckIcon,
    change: '+۸٪',
    changeType: 'positive',
  },
  {
    name: 'کل درآمد',
    value: '۴۵٬۶۷۸ تومان',
    icon: CurrencyDollarIcon,
    change: '+۲۳٪',
    changeType: 'positive',
  },
  {
    name: 'تعداد کل مشتریان',
    value: '۷۸۹',
    icon: UserGroupIcon,
    change: '+۵٪',
    changeType: 'positive',
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'order',
    title: 'سفارش جدید دریافت شد',
    description: 'سفارش شماره ۱۲۳۴۵ از علی رضایی',
    time: '۲ ساعت پیش',
  },
  {
    id: 2,
    type: 'product',
    title: 'محصول به‌روزرسانی شد',
    description: 'قیمت محصول شماره ۷۸۹ به‌روزرسانی شد',
    time: '۴ ساعت پیش',
  },
  {
    id: 3,
    type: 'shipping',
    title: 'سفارش ارسال شد',
    description: 'سفارش شماره ۱۲۳۴۰ ارسال شد',
    time: '۶ ساعت پیش',
  },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-iconSecondry-50 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="mr-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="mr-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`mr-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Recent Activity
        </h2>
        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
          <ul role="list" className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-primary-600">
                    {activity.title}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 