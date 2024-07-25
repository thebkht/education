import { Icons } from "@/components/icons";
import Link from "next/link";
import React from "react";

export default function Index({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <aside
        className={`flex flex-col gap-6 ${collapsed ? "w-[72px]" : "w-[250px]"} border-r border-popover p-4`}
      >
        <div className="flex flex-col gap-4">
          <Link
            className="flex flex-1 items-center gap-3 rounded"
            href={"/courses"}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 p-2">
              <Icons.home className="h-[18] w-[18px] text-primary" />
            </div>
            <span
              className={`text-sm font-medium text-primary transition-all duration-300 ease-in-out ${collapsed && "hidden"}`}
            >
              Mening kurslarim
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
