import { parseCookies } from "nookies";
import { AuthService } from "@/services/auth";
import { GetServerSidePropsContext } from "next";

export const AuthMiddleware =
  (getServerSidePropsFunction: Function, isAuthNotRequired?: boolean) =>
  async (context: GetServerSidePropsContext) => {
    const cookies = parseCookies(context);
    const token = cookies.token;

    try {
      const user = await AuthService.me(token);
      const props = await getServerSidePropsFunction(context);

      if (isAuthNotRequired) {
        return await getServerSidePropsFunction(context);
      } else {
        return {
          props: {
            ...props.props,
            user,
          },
        };
      }
    } catch (error: any) {
      if (error?.response?.status === 401 && !isAuthNotRequired) {
        context.res.setHeader("Set-Cookie", [
          "token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict",
        ]);
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      return await getServerSidePropsFunction(context);
    }
  };

export default AuthMiddleware;
