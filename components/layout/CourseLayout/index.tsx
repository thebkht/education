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
                  "relative flex cursor-pointer select-none items-center justify-start gap-1.5 rounded-lg border-none"
                }
              >
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src={collapsed ? "/apple-touch-icon.png" : "/logo.png"}
                    alt="Logo"
                    placeholder="empty"
                    // blurDataURL={getImageBase64()}
                    priority={true}
                    fill={true}
                    className={`h-auto object-contain transition-all ease-in-out`}
                    sizes="(max-width: 1920px) 100vw"
                  />
                </div>
                <div
                  className={cn(
                    "text-center text-[10px] font-bold text-primary transition-all ease-in-out",
                    collapsed && "hidden opacity-0",
                  )}
                >
                  AVTOMOBIL YO‘LLARI <br /> ILMIY-TADQIQOT <br /> INSTITUTI
                </div>
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
