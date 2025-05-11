'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { ProductForm } from './components/ProductForm'
import { Table } from './components/Table'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  bulkPricing: {
    quantity: number
    price: number
  }[]
  shippingMethod: 'supplier' | 'company'
  shippingAreas: string[]
  warehouses: {
    id: number
    name: string
    address: string
  }[]
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'محصول نمونه ۱',
    description: 'توضیحات محصول نمونه',
    price: 99.99,
    image: '/placeholder.png',
    bulkPricing: [
      { quantity: 1000, price: 89.99 },
      { quantity: 10000, price: 79.99 },
    ],
    shippingMethod: 'supplier',
    shippingAreas: ['تهران', 'اصفهان', 'شیراز'],
    warehouses: [
      {
        id: 1,
        name: 'انبار اصلی',
        address: 'تهران، ایران',
      },
    ],
  },
]

const columns = [
  { header: "نام", accessor: "name" },
  { header: "قیمت", accessor: "price", render: (value: number) => value + " تومان" },
  { header: "توضیحات", accessor: "description" },
  { header: "آیدی", accessor: "id", hidden: true },
  {
    header: "عملیات",
    accessor: "actions" as any,
    render: (_: any, row: Product) => (
      <div className="flex gap-2">
        <button
          className="text-primary-600 hover:text-primary-900"
          onClick={e => {
            e.stopPropagation();
            // ویرایش
            alert("ویرایش: " + row.id);
          }}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={e => {
            e.stopPropagation();
            // حذف
            alert("حذف: " + row.id);
          }}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    ),
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [selectedRows, setSelectedRows] = useState<Product[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0])
    },
  })

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting products...')
  }

  const handleImport = () => {
    if (selectedFile) {
      // Implement import functionality
      console.log('Importing products from:', selectedFile.name)
      setIsImportModalOpen(false)
      setSelectedFile(null)
    }
  }

  if (showAddProduct) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900">افزودن محصول جدید</h1>
          <button
            onClick={() => setShowAddProduct(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            بازگشت به لیست محصولات
          </button>
        </div>
        <ProductForm />
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">محصولات</h1>
          <p className="mt-2 text-sm text-gray-700">
            لیست تمام محصولات موجود در انبار شامل نام، قیمت و جزئیات دیگر.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowAddProduct(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            افزودن محصول
          </button>
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          type="button"
          onClick={() => setIsImportModalOpen(true)}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          وارد کردن
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          خروجی گرفتن
        </button>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <Table
              columns={columns}
              data={products}
              selectable={true}
              onSelectionChange={setSelectedRows}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className="btn-primary"
          onClick={() => {
            // همه سطرهای انتخاب‌شده
            console.log(selectedRows);
            alert("سطرهای انتخاب‌شده: " + selectedRows.map(r => r.id).join(", "));
          }}
        >
          دریافت سطرهای انتخاب‌شده
        </button>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    وارد کردن محصولات
                  </h3>
                  <div className="mt-2">
                    <div
                      {...getRootProps()}
                      className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                    >
                      <div className="space-y-1 text-center">
                        <input {...getInputProps()} />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
                          >
                            <span>انتخاب فایل</span>
                          </label>
                          <p className="mr-1">یا فایل را اینجا رها کنید</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          فقط فایل‌های اکسل (.xlsx, .xls)
                        </p>
                      </div>
                    </div>
                    {selectedFile && (
                      <p className="mt-2 text-sm text-gray-500">
                        فایل انتخاب شده: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  onClick={handleImport}
                >
                  وارد کردن
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  onClick={() => {
                    setIsImportModalOpen(false)
                    setSelectedFile(null)
                  }}
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 