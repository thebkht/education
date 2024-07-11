import Image from "next/image";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={inter.className}>
        <SiteHeader />
        <Hero />
      </div>
    </>
  );
}
