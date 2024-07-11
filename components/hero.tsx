import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Icons } from "./icons";

export function Hero() {
     return (
          <>
               <div className="container flex items-stretch rounded-lg mx-auto bg-primary">
                    <div className="flex-1 relative flex flex-col justify-center">
                         <div className="flex flex-col gap-4 w-[446px] text-primary-foreground mx-auto">
                              <h1 className="text-4xl font-bold">
                                   <Balancer>
                                        O&apos;zbekistonga jadal islohotlarga mos malakali kadrlar kerak
                                   </Balancer>
                              </h1>
                              <p className="text-2xl font-medium text-right">Sh.M Mirziyoyev</p>
                              <button className="bg-primary-foreground text-primary py-3 px-6 rounded-lg w-max">
                                   Kursni boshlash
                              </button>
                         </div>
                         <div className="">
                              <Icons.pattern className="w-full object-cover absolute top-0 left-0" />
                         </div>
                    </div>
                    <div className="flex-1 relative">
                         <div className="h-full w-full bg-primary absolute rounded-r-lg"></div>
                         <Image src="/hero-img.png" alt="Hero" fill className="rounded-r-lg !relative opacity-50" />
                    </div>
               </div>
          </>
     )
}