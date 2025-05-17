import { API_URL } from "@/configs/global";
import { ProductType } from "@/types/product-type";
import { ProductTypeList } from "./type-list";

async function getProductTypes(): Promise<unknown[]> {
    const res = await fetch(`${API_URL}/product/types?withDelay=3`);
    return res.json();
}

export default async function ProductTypes() {
    const types = await getProductTypes() as ProductType[];
    return <ProductTypeList types={types} />;
}
