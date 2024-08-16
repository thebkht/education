import { axios } from "@/api/interseptors";
import { getHeaders } from "@/helpers";
import { ILogin, IRefresh, ISignup, IUser } from "@/interfaces/auth";
import { Login } from "@/lib/types";
import { AxiosError } from "axios";

export const AuthService = {
  async me(token: string): Promise<IUser> {
    try {
      const response = await axios.get<ILogin>(
        "accounts/me",
        getHeaders(token),
      );
      return {
        username: response.data.username,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async login(data: Login): Promise<ILogin> {
    try {
      const response = await axios.post<ILogin>("accounts/login/", data);
      return {
        username: response.data.username,
        access: response.data.access,
        refresh: response.data.refresh,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async register(data: Login): Promise<ILogin> {
    try {
      const response = await axios.post<ILogin>("/accounts/register/", data);
      console.log(response);
      return {
        username: response.data.username,
        access: response.data.access,
        refresh: response.data.refresh,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async refreshToken(refreshToken: string): Promise<IRefresh> {
    try {
      const response = await axios.post<IRefresh>("/accounts/refresh/", {
        refresh: refreshToken,
      });
      return {
        access: response.data.access,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
