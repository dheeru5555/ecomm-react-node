import { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  itemIdentifier?: string;
}