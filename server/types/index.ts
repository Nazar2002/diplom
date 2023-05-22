type User = {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  room?: string;
};

type Users = User[];

export type { Users, User };
