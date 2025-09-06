export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageFile?: File | null;
}

export interface IUser {
  email: string;
  name: string;
  role: string;
  image?: string;
}
