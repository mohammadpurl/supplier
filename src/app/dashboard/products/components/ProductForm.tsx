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

const productFormSchema = z.object({
  name: z.string().min(2, {
    message: 'نام محصول باید حداقل 2 کاراکتر باشد',
  }),
  description: z.string().min(10, {
    message: 'توضیحات محصول باید حداقل 10 کاراکتر باشد',
  }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'قیمت باید یک عدد معتبر باشد',
  }),
  bulkPrice: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'قیمت عمده باید یک عدد معتبر باشد',
  }),
  bulkQuantity: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'تعداد عمده باید یک عدد معتبر باشد',
  }),
})

type ProductFormValues = z.infer<typeof productFormSchema>

export function ProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      bulkPrice: '',
      bulkQuantity: '',
    },
  })

  function onSubmit(data: ProductFormValues) {
    console.log(data)
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
        <Button type="submit">ذخیره محصول</Button>
      </form>
    </Form>
  )
} 