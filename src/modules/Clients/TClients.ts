export interface IClients {
  id: number;
  name: string;
  cpf: string;
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
