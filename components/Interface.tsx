export interface BaseUser {
  name: string;
  role: string;
  dateJoined: string;
}
export interface User extends BaseUser {
  id: number;
}
