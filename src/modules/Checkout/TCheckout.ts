export interface ICheckoutItems {
  id?: number;
  checkoutId?: number;
  productId: number;
  quantity: number;
  valueUnit?: number;
}

export interface ICheckout {
  id: number;
  status: string;
  total: number;
  clientsId: number;
  clientAddressId: number;
}

export interface ICheckoutCreation extends Omit<ICheckout, 'id'> {
  products: ICheckoutItems[];
}

export type TPaginateCheckoutAll = {
  data: ICheckout[];
  total: number;
  pages: number;
  page: number;
  limit: number;
};

export type TTotalQuery = {
  total: number;
};
