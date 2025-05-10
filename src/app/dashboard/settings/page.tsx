'use client'
import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Warehouse {
  id: number
  name: string
  address: string
}

interface ShippingArea {
  id: number
  name: string
  isActive: boolean
}

const initialWarehouses: Warehouse[] = [
  {
    id: 1,
    name: 'Main Warehouse',
    address: 'Tehran, Iran',
  },
]

const initialShippingAreas: ShippingArea[] = [
  {
    id: 1,
    name: 'Tehran',
    isActive: true,
  },
  {
    id: 2,
    name: 'Isfahan',
    isActive: true,
  },
  {
    id: 3,
    name: 'Shiraz',
    isActive: false,
  },
]

export default function SettingsPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses)
  const [shippingAreas, setShippingAreas] = useState<ShippingArea[]>(initialShippingAreas)
  const [newWarehouse, setNewWarehouse] = useState({ name: '', address: '' })
  const [newShippingArea, setNewShippingArea] = useState('')

  const handleAddWarehouse = () => {
    if (newWarehouse.name && newWarehouse.address) {
      setWarehouses([
        ...warehouses,
        {
          id: warehouses.length + 1,
          name: newWarehouse.name,
          address: newWarehouse.address,
        },
      ])
      setNewWarehouse({ name: '', address: '' })
    }
  }

  const handleDeleteWarehouse = (id: number) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id))
  }

  const handleAddShippingArea = () => {
    if (newShippingArea) {
      setShippingAreas([
        ...shippingAreas,
        {
          id: shippingAreas.length + 1,
          name: newShippingArea,
          isActive: true,
        },
      ])
      setNewShippingArea('')
    }
  }

  const handleDeleteShippingArea = (id: number) => {
    setShippingAreas(shippingAreas.filter((area) => area.id !== id))
  }

  const handleToggleShippingArea = (id: number) => {
    setShippingAreas(
      shippingAreas.map((area) =>
        area.id === id ? { ...area, isActive: !area.isActive } : area
      )
    )
  }

  return (
    <div className="space-y-8">
      {/* Warehouses Section */}
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Warehouses</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your warehouse locations and addresses.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Warehouse Name"
              value={newWarehouse.name}
              onChange={(e) =>
                setNewWarehouse({ ...newWarehouse, name: e.target.value })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Address"
              value={newWarehouse.address}
              onChange={(e) =>
                setNewWarehouse({ ...newWarehouse, address: e.target.value })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddWarehouse}
              className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Warehouse
            </button>
          </div>

          <div className="mt-4">
            <ul className="divide-y divide-gray-200">
              {warehouses.map((warehouse) => (
                <li
                  key={warehouse.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {warehouse.name}
                    </p>
                    <p className="text-sm text-gray-500">{warehouse.address}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteWarehouse(warehouse.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Shipping Areas Section */}
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Shipping Areas</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage the areas where you provide shipping services.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Area Name"
              value={newShippingArea}
              onChange={(e) => setNewShippingArea(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddShippingArea}
              className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Area
            </button>
          </div>

          <div className="mt-4">
            <ul className="divide-y divide-gray-200">
              {shippingAreas.map((area) => (
                <li
                  key={area.id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={area.isActive}
                      onChange={() => handleToggleShippingArea(area.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <p className="ml-3 text-sm font-medium text-gray-900">
                      {area.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteShippingArea(area.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 