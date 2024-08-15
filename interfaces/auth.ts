interface IUser {
  username: string;
}

interface ILogin {
  username: string;
  password: string;
  access_token: string;
}

interface ISignup {
  username: string;
  password: string;
  token: string;
}

export type { IUser, ILogin, ISignup };
