export interface ISupplier {
  id: number;
  name: string;
  cpnj: string;
  ie: string;
  razao_social: string;
  nome_fantasia: string;
}

export interface ISupplierCreation extends Omit<ISupplier, 'id'> {}
