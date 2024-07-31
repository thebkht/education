import Sidebar from "@/components/layout/SideMenu";
import Header from "@/components/layout/Header";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { getLocalStorage, setLocalStorage } from "@/helpers/localStorage";
import { IUser } from "@/interfaces/auth";
import { Toaster } from "sonner";
import { Skeleton } from "@/components/Skeleton";

const inter = Inter({ subsets: ["latin"] });

export default function Index({
  children,
  className,
  user,
}: {
  children: React.ReactNode;
  className?: string;
  user: IUser;
}) {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const localCollapsed = getLocalStorage("collapsed");
    if (localCollapsed) {
      setCollapsed(localCollapsed);
    }
    setLoading(false);
  }, []);

  const handleCollapse = () => {
    setCollapsed((prev) => {
      setLocalStorage(!prev ? 1 : 0, "collapsed");
      return !prev;
    });
  };
  return (
    <>
      <div
        className={cn(
          collapsed && styles.collapsed,
          styles.main,
          inter.className,
        )}
      >
        {!loading ? (
          <div className="z-50 flex">
            <div
              className={`flex-[1_1_1px] ${collapsed ? "w-[72px]" : "w-[250px]"} fixed z-50 box-border flex h-14 flex-col justify-center border-r border-border px-4`}
            >
              <Link
                href="/"
                className={
                  "relative flex cursor-pointer select-none rounded-lg border-none"
                }
              >
                <Image
                  src={collapsed ? "/favicon.ico" : "/logo.png"}
                  alt="Logo"
                  width={141}
                  height={32}
                  className={`h-auto transition-all duration-300 ease-in-out ${collapsed ? "hidden" : ""}`}
                  style={{ height: "auto" }}
                />
              </Link>
            </div>
          </div>
        ) : (
          <Skeleton className="w-full" />
        )}
        {!loading ? (
          <Header
            collapsed={collapsed}
            onCollapse={handleCollapse}
            session={user}
          />
        ) : (
          <Skeleton className="w-full px-6" />
        )}
        {!loading ? (
          <Sidebar collapsed={collapsed} />
        ) : (
          <Skeleton className="w-full px-4" count={5} />
        )}
        <main className="relative z-0 flex min-h-0 flex-[1_0_auto] justify-center bg-accent">
          <div className="flex w-full flex-[1_0_auto]">
            <div className="flex flex-1">
              <div className="flex flex-[1_0_1px] justify-center overflow-x-auto">
                <div className="flex flex-1">
                  <div className={cn("flex flex-1 justify-center", className)}>
                    <div className="flex w-full flex-col px-6 py-4">
                      {children}
                      <Toaster position="bottom-center" richColors />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
