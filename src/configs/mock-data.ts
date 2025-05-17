import { Product } from "@/types/product";
import { ProductCategory } from "@/types/product-category";
import { ProductColor } from "@/types/product-color";
import { ProductType } from "@/types/product-type";

export class SkeletonData {
    static categories: ProductCategory[] = [
        { id: 1, name: "اتاق نشیمن", enName: "Living Room", productCount: 6 },
        { id: 2, name: "اتاق خواب", enName: "Bedroom", productCount: 3 },
        { id: 3, name: "آشپزخانه", enName: "Kitchen", productCount: 0 },
        { id: 4, name: "اداری", enName: "Office", productCount: 2 },
        { id: 5, name: "نورپردازی", enName: "Lighting", productCount: 3 },
        { id: 6, name: "تزئینی", enName: "Decoration", productCount: 2 },
    ];

    static types: ProductType[] = [
        {
            id: 1,
            name: "صندلی راحتی",
            enName: "Armchair",
            productCount: 10
        },
        {
            id: 2,
            name: "مبل",
            enName: "Sofa",
            productCount: 3
        },
        {
            id: 3,
            name: "نیمکت",
            enName: "Bench",
            productCount: 0
        },
        {
            id: 4,
            name: "لامپ",
            enName: "Lamp",
            productCount: 3
        }
    ]

    static colors: ProductColor[] = Array(6)
        .fill(null)
        .map((_, index)=> ({
            id: index + 1,
            name: 'مشکی زغالی',
            enName: 'Charcoal Black',
            hex: '#36454f'
        }));


        static products: Product[] = Array(6)
        .fill(null)
        .map((_, index) => ({
            "id": index + 1,
            "name": "صندلی نرم با کوسن و پایه های چوبی",
            "price": 2900000,
            "discountPercent": 0,
            "imageUrl": 'data:,',
            "hoverImageUrl": 'data:,',
            "type": 1,
            "category": 1,
            "colors": [
                { "id": 1, "hex": "#FF4500" },
                { "id": 5, "hex": "#36454F" },
                { "id": 8, "hex": "#FFB6C1" }
            ]
        }));
}