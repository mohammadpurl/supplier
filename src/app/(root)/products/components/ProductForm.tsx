'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Product } from '../_types/product-types'
import { productSchema } from '../_types/product.schema'


type ProductFormValues = z.infer<typeof productSchema>

type ProductFormProps = {
  product?: Product | null
  onClose?: () => void
}

export function ProductForm({ product, onClose }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price?.toString() || '',
      bulkPrice: '',
      bulkQuantity: '',
      tieredPrices: [],
    },
  })

  function onSubmit(data: ProductFormValues) {
    console.log(data)
    // اینجا می‌توانید عملیات ذخیره را انجام دهید
    onClose?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام محصول</FormLabel>
              <FormControl>
                <Input placeholder="نام محصول را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Input placeholder="توضیحات محصول را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت (تومان)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="قیمت را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bulkPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>قیمت عمده (تومان)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="قیمت عمده را وارد کنید"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bulkQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تعداد عمده</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="تعداد عمده را وارد کنید"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="tieredPrices"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت‌گذاری پلکانی</FormLabel>
              <FormControl>
                <div>
                  {field.value.map((tier, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="حداقل تعداد"
                        value={tier.minQuantity}
                        onChange={(e) => {
                          const newTiers = [...field.value];
                          newTiers[index].minQuantity = e.target.value;
                          field.onChange(newTiers);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="قیمت واحد"
                        value={tier.unitPrice}
                        onChange={(e) => {
                          const newTiers = [...field.value];
                          newTiers[index].unitPrice = e.target.value;
                          field.onChange(newTiers);
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const newTiers = field.value.filter((_, i) => i !== index);
                          field.onChange(newTiers);
                        }}
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => {
                      field.onChange([...field.value, { minQuantity: '', unitPrice: '' }]);
                    }}
                  >
                    افزودن بازه قیمتی
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">ذخیره محصول</Button>
      </form>
    </Form>
  )
} 