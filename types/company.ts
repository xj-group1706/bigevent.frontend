import type { IMedia } from "./media";
import type { IRegion } from "./region";
import type { IDistrict } from "./district";
import type { IUser } from "./user";
import { IDirection } from "./direction";

export interface ICompany {
  id: number;
  directions: IDirection[];
  logo: IMedia;
  rate: number;
  region: IRegion;
  district: IDistrict;
  address: string;
  phone: string;
  owner: IUser;
  employees: IUser[];
  banner: IMedia;
  location: {
    lat: number;
    lng: number;
  };
}
