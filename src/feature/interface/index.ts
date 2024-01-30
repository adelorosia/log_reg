export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  refresh_token: string;
}

export type TUser = Partial<IUser>;

export interface IJWTPAYLOAD {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  photo: string;
}
