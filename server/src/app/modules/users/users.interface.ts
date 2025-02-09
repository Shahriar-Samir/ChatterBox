export type TUser = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isDeleted: boolean;
  participantType: 'admin' | 'user';
};
