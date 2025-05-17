export interface Product {
    id: number;
    name: string;
    price: number;
    discountPercent: number;
    imageUrl: string;
    hoverImageUrl: string;
    type: number;
    category: number;
    colors: ProductColorSummaryDto[];
}

export interface ProductColorSummaryDto {
    id: number;
    hex: string;
}