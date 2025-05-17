import { FC } from 'react';
import Link from 'next/link';
import { ProductColor } from '@/types/product-color';

type Props = {
  colors: ProductColor[];
  isSkeleton?: boolean;
};

export const ProductColorList: FC<Props> = ({ colors, isSkeleton }) => {
  return (
    <div className={`fade-in text-secondary flex flex-col gap-3 mt-3 ${isSkeleton ? 'skeleton': ''} `}>
      {colors.map(color => (
        <Link  href={`?colorId=${color.id}`} className='hover:text-primary flex items-center gap-2' key={color.id}><span className={`block w-3 h-3 rounded-full`} style={{backgroundColor: color.hex}}></span><span>{color.name}</span> <span className='mr-auto'>{color.enName}</span></Link>
       
      ))}
    </div>
  );
};
