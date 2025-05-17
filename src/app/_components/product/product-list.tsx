import { Product } from "@/types/product";
import { ProductCard } from "./product-card";

export default function ProductList ({products, isSkeleton}: {products: Product[], isSkeleton?: boolean}) {
    return (
        <div className={`pr-10 grid grid-cols-3 gap-x-8 gap-y-10 ${isSkeleton ? 'skeleton' : ''}`}>
        {
            products.map((product) => (
                <ProductCard key={`product-${product.name}`} product={product}/>
            ))
        }
    </div>
    )
}