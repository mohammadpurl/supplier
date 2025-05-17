import { API_URL } from "@/configs/global";
import { ProductColor } from "@/types/product-color";
import { ProductColorList } from "./color-list";

async function getProductColors(): Promise<unknown[]> {
    const res = await fetch(`${API_URL}/product/colors?withDelay=2`);
    return res.json();
}

export default async function ProductColors() {
    const colors = await getProductColors() as ProductColor[];
    return <ProductColorList colors={colors} />;
}
