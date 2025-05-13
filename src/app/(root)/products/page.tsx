'use client'

import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { ProductForm } from './components/ProductForm'
import { Table } from '@/components/Table'
import axios from 'axios'
import { Product } from './types'
import { FormDialog } from '@/components/FormDialog'

// داده‌های ماک برای تست
const mockProducts: Product[] = [
  {
    id: 1,
    name: "گوشی سامسونگ Galaxy S21",
    description: "گوشی هوشمند سامسونگ با صفحه نمایش 6.2 اینچی",
    price: 25000000,
    image: "/images/s21.jpg",
    category: "موبایل",
    stock: 15,
    createdAt: "2024-01-15T10:30:00",
    bulkPricing: [
      { quantity: 5, price: 24000000 },
      { quantity: 10, price: 23000000 }
    ],
    shippingMethod: "supplier",
    shippingAreas: ["تهران", "اصفهان"],
    warehouses: [
      { id: 1, name: "انبار مرکزی", address: "تهران، خیابان ولیعصر" }
    ]
  },
  {
    id: 2,
    name: "لپ تاپ لنوو ThinkPad X1",
    description: "لپ تاپ حرفه‌ای با پردازنده نسل 12",
    price: 48000000,
    image: "/images/thinkpad.jpg",
    category: "لپ تاپ",
    stock: 8,
    createdAt: "2024-01-16T14:20:00",
    bulkPricing: [
      { quantity: 3, price: 47000000 }
    ],
    shippingMethod: "company",
    shippingAreas: ["تهران", "مشهد", "شیراز"],
    warehouses: [
      { id: 2, name: "انبار شرق", address: "مشهد، بلوار سجاد" }
    ]
  },
  {
    id: 3,
    name: "هدفون سونی WH-1000XM4",
    description: "هدفون بی‌سیم با قابلیت حذف نویز",
    price: 12000000,
    image: "/images/sony.jpg",
    category: "صوتی",
    stock: 25,
    createdAt: "2024-01-17T09:15:00",
    bulkPricing: [
      { quantity: 5, price: 11500000 },
      { quantity: 10, price: 11000000 }
    ],
    shippingMethod: "supplier",
    shippingAreas: ["تهران", "تبریز", "اصفهان"],
    warehouses: [
      { id: 3, name: "انبار غرب", address: "تبریز، خیابان آزادی" }
    ]
  },
  {
    id: 4,
    name: "تبلت آیپد پرو 2023",
    description: "تبلت اپل با صفحه نمایش 12.9 اینچی",
    price: 52000000,
    image: "/images/ipad.jpg",
    category: "تبلت",
    stock: 10,
    createdAt: "2024-01-18T16:40:00",
    bulkPricing: [
      { quantity: 2, price: 51000000 },
      { quantity: 4, price: 50000000 }
    ],
    shippingMethod: "company",
    shippingAreas: ["تهران"],
    warehouses: [
      { id: 4, name: "انبار مرکزی", address: "تهران، خیابان شریعتی" }
    ]
  },
  {
    id: 5,
    name: "ساعت هوشمند اپل واچ 9",
    description: "ساعت هوشمند با قابلیت پایش سلامت",
    price: 18000000,
    image: "/images/watch.jpg",
    category: "پوشیدنی",
    stock: 20,
    createdAt: "2024-01-19T11:25:00",
    bulkPricing: [
      { quantity: 3, price: 17500000 },
      { quantity: 6, price: 17000000 }
    ],
    shippingMethod: "supplier",
    shippingAreas: ["تهران", "اصفهان", "شیراز", "مشهد"],
    warehouses: [
      { id: 5, name: "انبار جنوب", address: "شیراز، بلوار زند" }
    ]
  }
];

const columns = [
  { header: "نام", accessor: "name" as keyof Product, sortable: true, width: "200px", searchable: true },
  { header: "قیمت", accessor: "price" as keyof Product, sortable: true, width: "120px", render: (v: number) => v + " تومان" , searchable: true },
  { header: "توضیحات", accessor: "description" as keyof Product, width: "300px" , searchable: true},
  { header: "آیدی", accessor: "id" as keyof Product, hidden: true , searchable: true},
  // {
  //   header: "عملیات",
  //   accessor: "actions" as any,
  //   render: (_: any, row: Product) => (
  //     <div className="flex gap-2">
  //       <button
  //         className="text-primary-600 hover:text-primary-900"
  //         onClick={e => {
  //           e.stopPropagation();
  //           // ویرایش
  //           console.log('Edit product:', row);
  //         }}
  //       >
  //         <PencilIcon className="h-5 w-5" />
  //       </button>
  //       <button
  //         className="text-red-600 hover:text-red-900"
  //         onClick={e => {
  //           e.stopPropagation();
  //           // حذف
  //           console.log('Delete product:', row);
  //         }}
  //       >
  //         <TrashIcon className="h-5 w-5" />
  //       </button>
  //     </div>
  //   ),
  //   width: "120px"
  // },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0
  })
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowAddProduct(true)
  }

  const handleCloseForm = () => {
    setShowAddProduct(false)
    setEditingProduct(null)
  }

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

  // به‌روزرسانی تابع fetchProducts برای استفاده از داده‌های ماک
  const fetchProducts = async (page: number, pageSize: number) => {
    try {
      setIsLoading(true);
      
      // شبیه‌سازی تاخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 500));

      // محاسبه ایندکس شروع و پایان برای صفحه‌بندی
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      
      // فیلتر کردن داده‌ها برای صفحه فعلی
      const paginatedData = mockProducts.slice(startIndex, endIndex);
      
      setProducts(paginatedData);
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(mockProducts.length / pageSize),
        pageSize: pageSize,
        totalItems: mockProducts.length
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // به‌روزرسانی تابع handleDelete برای استفاده از داده‌های ماک
  const handleDelete = async (product: Product) => {
    try {
      // شبیه‌سازی تاخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // حذف محصول از آرایه ماک
      const updatedProducts = mockProducts.filter(p => p.id !== product.id);
      mockProducts.length = 0;
      mockProducts.push(...updatedProducts);
      
      // به‌روزرسانی لیست
      await fetchProducts(pagination.currentPage, pagination.pageSize);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // به‌روزرسانی تابع handleBulkDelete برای استفاده از داده‌های ماک
  const handleBulkDelete = async () => {
    try {
      // شبیه‌سازی تاخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // حذف محصولات انتخاب شده از آرایه ماک
      const selectedIds = selectedProducts.map(p => p.id);
      const updatedProducts = mockProducts.filter(p => !selectedIds.includes(p.id));
      mockProducts.length = 0;
      mockProducts.push(...updatedProducts);
      
      // به‌روزرسانی لیست
      await fetchProducts(pagination.currentPage, pagination.pageSize);
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error bulk deleting products:', error);
    }
  };

  // لود اولیه داده‌ها
  useEffect(() => {
    fetchProducts(1, 10);
  }, []);

  const handleCancel = () => {
    if (confirm('آیا مطمئن هستید؟')) {
      setOpen(false)
    }
  }

  if (showAddProduct) {
    return (
      <FormDialog
        open={showAddProduct}
        onOpenChange={setShowAddProduct}
        title="افزودن محصول جدید"
        description="لطفاً اطلاعات محصول جدید را وارد کنید"
        onCancel={handleCloseForm}
        loading={loading}
      >
        <ProductForm product={editingProduct} onClose={handleCloseForm} />
      </FormDialog>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>
        <div className="flex gap-2">
          {selectedProducts.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              حذف {selectedProducts.length} محصول انتخاب شده
            </button>
          )}
          <button
            onClick={() => setShowAddProduct(true)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-focus"
          >
            افزودن محصول
          </button>
        </div>
      </div>

      <div className="my-4 gap-2 flex space-x-4">
        <button
          type="button"
          onClick={() => setIsImportModalOpen(true)}
          className="inline-flex gap-2 items-center rounded-md border border-primary bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5 text-iconPrimary-100" aria-hidden="true" />
          وارد کردن
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex gap-2 items-center rounded-md border border-primary bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5 text-iconPrimary-100" aria-hidden="true" />
          خروجی گرفتن
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          data={products}
          pagination={pagination}
          onPageChange={fetchProducts}
          selectable={true}
          onSelectionChange={setSelectedProducts}
          rowActions={{
            showEdit: true,
            showDelete: true,
            onEdit: handleEdit,
            onDelete: handleDelete
          }}
          className="bg-white"
        />
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