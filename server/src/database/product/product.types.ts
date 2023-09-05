export type ProductDto = {
  name: string;
  description: string;
};

export type Product = {
  id: string;
} & ProductDto;

export type Products = {
  products: Product[];
};
