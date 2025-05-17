import { API_URL } from "@/configs/global";
import { ProductCategory } from "@/types/product-category";
import { ProductCategoryList } from "./category-list";

async function getProductCategories(): Promise<unknown[]> {
    const res = await fetch(`${API_URL}/product/categories?withDelay=4`);
    return res.json();
}

export default async function ProductCategories() {
    const categories = await getProductCategories() as ProductCategory[];
    return <ProductCategoryList categories={categories} />;
}
