export interface IClients {
  id: number;
  name: string;
  cpf: string;
  birthdate: Date;
  mail: string;
  phone: string;
}

export interface IClientsCreation extends Omit<IClients, 'id'> {}
