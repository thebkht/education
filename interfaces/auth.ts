interface IUser {
  username: string;
}

interface ILogin {
  username: string;
  access: string;
  refresh: string;
}

interface ISignup {
  username: string;
  password: string;
  token: string;
}

interface IRegister {
  username: string;
  password: string;
}

interface IRefresh {
  access: string;
}

export type { IUser, ILogin, ISignup, IRegister, IRefresh };
