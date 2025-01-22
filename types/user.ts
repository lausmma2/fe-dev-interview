export type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  active: boolean;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export type FormUser = {
  email: string;
  name: string;
  surname: string;
  active: boolean;
  plainPassword: string;
  note: string;
};
