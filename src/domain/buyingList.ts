export enum ProductStatus {
  ToBuy,
  Bought,
}

export type Product = {
  name: string;
  quantity: number;
  status: ProductStatus;
};

export type Products = Product[];
