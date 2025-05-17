
import { Product } from "@/types/product";
import ProductList from "./product-list";
import { API_URL } from "@/configs/global";

async function getProducts(category: string, type: string, colorId: string): Promise<Product[]> {
    console.log(type);
    const res = await fetch(`${API_URL}/product/sieve?withDelay=3${category ? '&category=' + category : ''}${type ? '&type=' + type : ''}${colorId ? '&colorId=' + colorId : ''}`, { cache: 'no-store' });
    return res.json();
}

export default async function Products({ category, type, colorId }: { category: string; type: string, colorId: string }) {
    const products = await getProducts(category, type, colorId);
    return (
        <ProductList products={products} />
    );
}
