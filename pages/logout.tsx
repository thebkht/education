import { GetServerSidePropsContext } from "next";

const Logout = () => {
  return null;
};

export default Logout;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  context.res.setHeader("Set-Cookie", [
    "token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict",
  ]);

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
