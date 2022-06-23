export interface IClients {
  id: number;
  name: string;
  cpf?: string;
  birthdate: Date;
  mail: string;
  phone: string;
  address: IAddress[];
}

export interface IAddress {
  id?: number;
  name: string;
  streetname: string;
  streetname2: string;
  number: string;
  city: string;
  zipcode: string;
  state: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IClientsRequest extends IClients {
  password: string;
}

export interface IClientsCreation extends Omit<IClients, 'id'> {
  password?: string;
}

export type TClientsQuery = {
  id: number;
  name: string;
  birthdate: Date;
  mail: string;
  phone: string;
};

export type TTotalQuery = {
  total: number;
};

export type TPaginateClient = {
  data: TClientsQuery[];
  total: number;
  pages: number;
  page: number;
  limit: number;
};

export type TPaginateClientAll = {
  data: IClients[];
  total: number;
  pages: number;
  page: number;
  limit: number;
};
