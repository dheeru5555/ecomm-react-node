export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  category: string;
  description?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  stock?: number;
}