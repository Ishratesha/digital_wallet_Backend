
export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "AGENT",
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED",
}
export interface IAuthProvider {
  provider: string;  // "Google", "Credential"
  providerId: string;
}
export interface IUser {
  _id?: string;
  phoneNumber: string;
  nid: string;
  picture?: string;
  email: string;
  password: string;
  role: UserRole;
  status?: UserStatus;
  auths: IAuthProvider[];
  createdAt?: Date;
  updatedAt?: Date;
}
