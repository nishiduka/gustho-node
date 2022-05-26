export interface ISupplier {
  id: number;
  name: string;
  cpnj: string;
  ie: string;
  razao_social: string;
  nome_fantasia: string;
  contacts?: ISupplierContact[];
}

export interface ISupplierCreation extends Omit<ISupplier, 'id'> {}

export interface ISupplierContact {
  id: number;
  type: string;
  contact: string;
  person_name: string;
  supplierId: number;
}
