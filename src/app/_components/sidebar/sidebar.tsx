import { FC, Suspense } from "react";
import ProductCategories from "./category-filter/categories";
import ProductTypes from "./type-filter/types";
import ProductColors from "./color-filter/colors";
import SidebarTitle from "./sidebar-title";
import { ProductCategoryList } from "./category-filter/category-list";
import { SkeletonData } from  "@/configs/mock-data"
import { ProductTypeList } from "./type-filter/type-list";
import { ProductColorList } from "./color-filter/color-list";


const categories = SkeletonData.categories;
const types = SkeletonData.types;
const colors = SkeletonData.colors;
const Sidebar:FC = () => {
    
    return (
        <>
        <aside className="sticky top-4">
            <SidebarTitle/>
            <h4 className="font-semibold">براساس دسته بندی</h4>
            <Suspense fallback={<ProductCategoryList isSkeleton={true} categories={categories}/>}>            
        
            <ProductCategories/>
            </Suspense>
            <h4 className="font-semibold mt-6">براساس نوع</h4>
            <Suspense fallback={<ProductTypeList isSkeleton={true} types={types}/> }>
       
            <ProductTypes/>
            </Suspense>
            <h4 className="font-semibold mt-6">براساس رنگ</h4>
            <Suspense fallback={<ProductColorList isSkeleton={true} colors={colors}/>}>
          
            <ProductColors/>
            </Suspense>
        </aside>
        </>
    )
}
export default Sidebar;