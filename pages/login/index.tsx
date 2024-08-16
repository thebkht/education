import styles from "./style.module.css";
import { cn } from "@/lib/utils";
import Button from "@/components/UI/Button";
import UserAuthForm from "@/components/UserAuthForm";
import Image from "next/image";
import { useRouter } from "next/router";
import Metadata from "@/components/Metadata";
import { useEffect } from "react";
import { IUser } from "@/interfaces/auth";
import AuthMiddleware from "@/middlewares/auth";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

type Props = {
  user: IUser | null;
  searchParams: string;
};

export default function Login({ user }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/courses");
    }
  }, [user, router]);
  return (
    <>
      <Metadata title="Тизимга кириш" />
      <div className={styles.root}>
        <Button
          variant={"outline"}
          onClick={() => router.back()}
          className={cn(
            "border-baktext-background absolute left-4 top-4 z-10 bg-transparent text-background hover:bg-background hover:text-foreground md:left-8 md:top-8",
          )}
        >
          Orqaqa qaytish
        </Button>
        <div className={styles["image-wrapper"]}>
          <Image
            src="/login.svg"
            alt="Login"
            fill
            priority
            className={styles.image}
          />
        </div>
        <div className={styles["form-wrapper"]}>
          <div className={styles.form}>
            <div className={styles["form-header"]}>
              <h1>Tizimga kirish</h1>
              <p>Tizimga kirish uchun login va parolingizni kiriting</p>
            </div>
            <UserAuthForm />
            <div className="border-t pt-3">
              <p className="text-center text-sm text-muted-foreground">
                Hali ro&apos;yxatdan o&apos;tmaganmisiz?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Ro&apos;yxatdan o&apos;ting
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const getServerSidePropsFunction = async (ctx: GetServerSidePropsContext) => {
  return {};
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
