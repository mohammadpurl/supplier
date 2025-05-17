
'use client';

import Image from 'next/image';

type Props = {
    src: string;
    hoverSrc: string;
    alt: string;
}
export default function HoverImage({src, hoverSrc, alt}: Props) {
  // State to manage the current image source
  return (
    <div className="relative w-[306px] h-[306px] overflow-hidden group">
    {/* Default Image */}
    <Image
      src={src}
      alt={alt}
      width={306}
      height={306}
      className="absolute rounded-2xl inset-0 object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-350"
    />

    {/* Hover Image */}
    <Image
      src={hoverSrc}
      alt="Hover Image"
      width={306}
      height={306}
      className="absolute inset-0 rounded-2xl object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-350"
    />
  </div>
  );
}
