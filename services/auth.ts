import { axios } from "@/api/interseptors";
import { getHeaders } from "@/helpers";
import { ILogin, ISignup, IUser } from "@/interfaces/auth";
import { AxiosError } from "axios";

export const AuthService = {
  async me(token: string): Promise<IUser> {
    try {
      const response = await axios.get<ILogin>(
        "accounts/me",
        getHeaders(token),
      );
      return {
        fullName: response.data.fullname,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async login(token: string): Promise<ISignup> {
    try {
      const response = await axios.get<ILogin>(
        "accounts/temp-login",
        getHeaders(token),
      );
      return {
        fullName: response.data.fullname,
        token: response.data.access_token,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
