import { parseCookies } from "nookies";
import { AuthService } from "@/services/auth";
import { GetServerSidePropsContext } from "next";

export const AuthMiddleware =
  (getServerSidePropsFunction: Function, isAuthNotRequired?: boolean) =>
  async (context: GetServerSidePropsContext) => {
    const cookies = parseCookies(context);
    const accessToken = cookies["access_token"];

    try {
      let user = null;

      try {
        if (accessToken) {
          user = await AuthService.me(accessToken);
        } else if (cookies["refresh_token"]) {
          const newTokens = await AuthService.refreshToken(
            cookies["refresh_token"],
          );
          user = await AuthService.me(newTokens.access);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
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
          "refresh_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict",
          "access_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict",
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
