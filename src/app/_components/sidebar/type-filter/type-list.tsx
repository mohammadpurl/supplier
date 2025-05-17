import { FC } from 'react';
import Link from 'next/link';
import { ProductType } from '@/types/product-type';

type Props = {
  types: ProductType[];
  isSkeleton?: boolean;
};

export const ProductTypeList: FC<Props> = ({ types, isSkeleton = false }) => {
  return (
    <div className={`fade-in text-secondary flex flex-col gap-3 mt-3 ${isSkeleton ? 'skeleton': ''}`}>
      {types.map(type => (
          <Link href={`?type=${type.name}`} className='hover:**:text-primary  flex justify-between' key={type.id}><span className='text-black/90 flex gap-1'><span>{`${type.name} `}</span> <span className=' text-sm text-black/45'>({type.productCount})</span></span> <span>{type.enName} </span></Link>
      ))}
    </div>
  );
};
