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

export interface ProductList {
  Products:Product[] | null | undefined,
  error: Problem
}


import {z} from 'zod';
import { productSchema } from './product.schema';
import { Problem } from '@/types/http-errors.interface'
export type ProductS = z.infer<typeof productSchema>