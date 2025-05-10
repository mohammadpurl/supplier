import {
  CurrencyDollarIcon,
  CubeIcon,
  TruckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Products',
    value: '1,234',
    icon: CubeIcon,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Active Orders',
    value: '56',
    icon: TruckIcon,
    change: '+8%',
    changeType: 'positive',
  },
  {
    name: 'Total Revenue',
    value: '$45,678',
    icon: CurrencyDollarIcon,
    change: '+23%',
    changeType: 'positive',
  },
  {
    name: 'Total Customers',
    value: '789',
    icon: UserGroupIcon,
    change: '+5%',
    changeType: 'positive',
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'order',
    title: 'New order received',
    description: 'Order #12345 from John Doe',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'product',
    title: 'Product updated',
    description: 'Price updated for Product #789',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'shipping',
    title: 'Order shipped',
    description: 'Order #12340 has been shipped',
    time: '6 hours ago',
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
              <div className="absolute rounded-md bg-primary-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
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