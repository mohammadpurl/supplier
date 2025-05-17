import { FC } from 'react';
import { ProductCategory } from '@/types/product-category';
import Link from 'next/link';

type Props = {
  categories: ProductCategory[];
  isSkeleton?: boolean
};

export const ProductCategoryList: FC<Props> = ({ categories, isSkeleton = false}) => {
  return (
    <div className={`fade-in text-secondary flex flex-col gap-3 mt-3 ${isSkeleton ? 'skeleton': ''}`}>
      {categories.map(category => (
        <Link href={`?category=${category.name}`} className='hover:**:text-primary flex justify-between' key={category.id}>
            <span className='text-black/90 flex gap-1'>
                <span className=''>
                  {`${category.name} `}
                </span>
                <span className=' text-sm text-black/45'>
                  ({category.productCount})
                </span>
            </span> 
            <span className=''>
              {category.enName}
            </span>
        </Link>
      ))}
    </div>
  );
};
