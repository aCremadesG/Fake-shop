import { Product } from "./product"
export interface Section {
    title: string, 
    size: number, 
    urlTitle: string,
    url: string, 
    products: Product[]
}
