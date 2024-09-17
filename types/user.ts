import { IMedia } from "./media";

export interface IUser {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  fullName: string;
  phone: string;
  avatar: IMedia;
  birthDate: string;
}
