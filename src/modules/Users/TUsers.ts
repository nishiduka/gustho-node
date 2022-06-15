export interface IUsers {
  id: number;
  name: string;
  mail: string;
  password?: string;
  roleId?: number;
}

export interface IUsersCreation extends Omit<IUsers, 'id'> {}
