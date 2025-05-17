import { Product, ProductColorSummaryDto } from "@/types/product";
import HoverImage from "../hover-image";


export function ProductCard({product}: {product: Product}) {
    return (
        <div key={product.id} className="relative">
                    {
                        product.discountPercent !== 0 && (<span dir="ltr" className="absolute top-3 right-3 z-50 flex  bg-danger rounded-[4px] text-light px-1 text-xs">- {product.discountPercent}%</span>)
                    }

                    <HoverImage src={product.imageUrl} hoverSrc={product.hoverImageUrl} alt={product.name} />
                    <div className="mt-6 mb-4 flex items-center gap-3">
                        {
                            product.colors.map((colorItem: ProductColorSummaryDto) => <span key={`product-color-item-${colorItem.id}`} className={`block w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: colorItem.hex }}></span>)
                        }

                    </div>
                    <h2 className="mt-0 line-clamp-1">{product.name}</h2>
                    <h3 className="font-semibold mt-3 text-lg">


                        {product.discountPercent > 0 ? (
                            <div className="flex items-center gap-3">
                                <span>{Math.abs((product.price - (product.price * product.discountPercent))).toLocaleString()} تومان</span>
                                <span className="text-secondary-text-emphasis/40 text-sm line-through">{product.price.toLocaleString()} تومان</span>

                            </div>
                        ) : <span>{product.price.toLocaleString()} تومان</span>}

                    </h3>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="target bg-dark flex items-center justify-center gap-2 text-sm hover:bg-black transition-all  cursor-pointer rounded-3xl text-white  flex-1  py-2.5">
                           <span> افزودن به سبد خرید</span>
                            <span>+</span>
                        </button>
                        <div className="w-10 h-10 bg-secondary/15  text-black/70 hover:bg-secondary/25 cursor-pointer flex items-center justify-center rounded-full" >
                            <svg width="16" height="16" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                </div>
    )
}