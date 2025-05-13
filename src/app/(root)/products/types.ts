export interface Product {
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
  category: string
  stock: number
  createdAt: string
} 