export interface IProducts {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  metric: string;
  price: number;
  quantity: number;
  images?: string[];
}

export interface IProductsCreation extends Omit<IProducts, 'id'> {}

export type TProductsQuery = {
  id: number;
  avaliable: number;
  name: string;
  shortDescription: string;
  imgUrl?: string;
};

export type TTotalQuery = {
  total: number;
};

export type TPaginateProduct = {
  data: TProductsQuery[];
  total: number;
  pages: number;
  page: number;
  limit: number;
};

export type TPaginateProductAll = {
  data: IProducts[];
  total: number;
  pages: number;
  page: number;
  limit: number;
};
