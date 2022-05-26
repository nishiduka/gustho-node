export interface IProducts {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  metric: string;
  price: number;
  quantity: number;
}

export interface IProductsCreation extends Omit<IProducts, 'id'> {}
