import {z} from 'zod';

export const productSchema = z.object({
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
    tieredPrices: z.array(
      z.object({
        minQuantity: z.string().refine((val) => !isNaN(Number(val)), {
          message: 'حداقل تعداد باید یک عدد معتبر باشد',
        }),
        unitPrice: z.string().refine((val) => !isNaN(Number(val)), {
          message: 'قیمت واحد باید یک عدد معتبر باشد',
        }),
      }).optional()
    ),
})