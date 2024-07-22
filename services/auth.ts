import { axios } from "@/api/interseptors";
import { User } from "@/interfaces/auth";

export const AuthServices = {
  async session(): Promise<User> {
    try {
      const res = await axios.get("accounts/me");
      return {
        fullName: res.data.fullName,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async login(): Promise<User> {
    try {
      const res = await axios.get("accounts/login");
      return {
        fullName: res.data.fullName,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
