interface IUser {
  fullName: string;
}

interface ILogin {
  fullname: string;
  access_token: string;
}

interface ISignup {
  fullName: string;
  token: string;
}

export type { IUser, ILogin, ISignup };
