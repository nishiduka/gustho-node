export interface IAuth {
  id: number;
}

export interface IAuthCreation extends Omit<IAuth, 'id'> {}

export interface IAuthRequest {
  id: number;
  name: string;
}
