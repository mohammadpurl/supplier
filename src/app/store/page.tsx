import { SkeletonData } from "@/configs/mock-data";
import { Suspense } from "react";
import Products from "../_components/product/products";
import ProductList from "../_components/product/product-list";


type Props = {
  searchParams: { [key: string]: string };
};

export const revalidate = 0;

const mockData = SkeletonData.products;
export default async function Home({ searchParams }: Props) {
  const getSearchParams = await searchParams;
  const category = getSearchParams?.category || '';
  const type = getSearchParams?.type || '';
  const colorId = getSearchParams?.colorId || '';
  console.log(category);
  return (
    <Suspense  key={JSON.stringify(getSearchParams)} fallback={<ProductList isSkeleton={true} products={mockData}/>}>
      <Products category={category} type={type} colorId={colorId}/>
    </Suspense>
  );
}
