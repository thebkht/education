import Image from "next/image";
import Balancer from "react-wrap-balancer";

import { Icons } from "@/components/icons";
import Button from "@/components/UI/Button";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Index() {
     return (
          <>
               {" "}
               <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    slidesPerView={1}
                    navigation
                    className="h-[428px]"
                    loop={true}
                    autoplay={{
                         delay: 2500,
                         disableOnInteraction: false,
                    }}
                    pagination={{
                         clickable: true,
                    }}
                    scrollbar={{
                         draggable: true,
                    }}
               >
                    {" "}
                    <SwiperSlide className="!flex items-stretch rounded-lg bg-primary">
                         <div className="flex-1 relative flex flex-col justify-center">
                              {" "}
                              <div className="flex flex-col gap-4 lg:w-[446px] p-6 lg:p-0 text-primary-foreground mx-auto">
                                   {" "}
                                   <h1 className="lg:text-4xl text-3xl font-bold">
                                        {" "}
                                        <Balancer>
                                             {" "}
                                             O&apos;zbekistonga jadal islohotlarga mos malakali kadrlar
                                             kerak{" "}
                                        </Balancer>{" "}
                                   </h1>{" "}
                                   <p className="lg:text-2xl text-xl font-medium text-right">
                                        Sh.M Mirziyoyev
                                   </p>{" "}
                                   <Button variant={"secondary"} size={"lg"} className="w-fit">
                                        {" "}
                                        Kursni boshlash{" "}
                                   </Button>{" "}
                              </div>{" "}
                              <div>
                                   {" "}
                                   <Icons.pattern className="w-full object-cover absolute top-0 left-0" />{" "}
                              </div>{" "}
                         </div>{" "}
                         <div className="flex-1 relative md:block hidden">
                              {" "}
                              <div className="h-full w-full bg-primary absolute rounded-r-lg z-10 opacity-50"></div>{" "}
                              <Image
                                   src="/hero-img.png"
                                   alt="Hero"
                                   fill
                                   className="rounded-r-lg !relative"
                              />{" "}
                         </div>
                    </SwiperSlide>{" "}
                    <SwiperSlide className="!flex items-stretch rounded-lg bg-primary">
                         <div className="flex-1 relative flex flex-col justify-center">
                              {" "}
                              <div className="flex flex-col gap-4 lg:w-[446px] p-6 lg:p-0 text-primary-foreground mx-auto">
                                   {" "}
                                   <h1 className="lg:text-4xl text-3xl font-bold">
                                        {" "}
                                        <Balancer>
                                             {" "}
                                             O&apos;zbekistonga jadal islohotlarga mos malakali kadrlar
                                             kerak{" "}
                                        </Balancer>{" "}
                                   </h1>{" "}
                                   <p className="lg:text-2xl text-xl font-medium text-right">
                                        Sh.M Mirziyoyev
                                   </p>{" "}
                                   <Button variant={"secondary"} size={"lg"} className="w-fit">
                                        {" "}
                                        Kursni boshlash{" "}
                                   </Button>{" "}
                              </div>{" "}
                              <div>
                                   {" "}
                                   <Icons.pattern className="w-full object-cover absolute top-0 left-0" />{" "}
                              </div>{" "}
                         </div>{" "}
                         <div className="flex-1 relative md:block hidden">
                              {" "}
                              <div className="h-full w-full bg-primary absolute rounded-r-lg z-10 opacity-50"></div>{" "}
                              <Image
                                   src="/hero-img.png"
                                   alt="Hero"
                                   fill
                                   className="rounded-r-lg !relative"
                              />{" "}
                         </div>
                    </SwiperSlide>{" "}
                    <SwiperSlide className="!flex items-stretch rounded-lg bg-primary">
                         <div className="flex-1 relative flex flex-col justify-center">
                              {" "}
                              <div className="flex flex-col gap-4 lg:w-[446px] p-6 lg:p-0 text-primary-foreground mx-auto">
                                   {" "}
                                   <h1 className="lg:text-4xl text-3xl font-bold">
                                        {" "}
                                        <Balancer>
                                             {" "}
                                             O&apos;zbekistonga jadal islohotlarga mos malakali kadrlar
                                             kerak{" "}
                                        </Balancer>{" "}
                                   </h1>{" "}
                                   <p className="lg:text-2xl text-xl font-medium text-right">
                                        Sh.M Mirziyoyev
                                   </p>{" "}
                                   <Button variant={"secondary"} size={"lg"} className="w-fit">
                                        {" "}
                                        Kursni boshlash{" "}
                                   </Button>{" "}
                              </div>{" "}
                              <div>
                                   {" "}
                                   <Icons.pattern className="w-full object-cover absolute top-0 left-0" />{" "}
                              </div>{" "}
                         </div>{" "}
                         <div className="flex-1 relative md:block hidden">
                              {" "}
                              <div className="h-full w-full bg-primary absolute rounded-r-lg z-10 opacity-50"></div>{" "}
                              <Image
                                   src="/hero-img.png"
                                   alt="Hero"
                                   fill
                                   className="rounded-r-lg !relative"
                              />{" "}
                         </div>
                    </SwiperSlide>{" "}
                    <SwiperSlide className="!flex items-stretch rounded-lg bg-primary">
                         <div className="flex-1 relative flex flex-col justify-center">
                              {" "}
                              <div className="flex flex-col gap-4 lg:w-[446px] p-6 lg:p-0 text-primary-foreground mx-auto">
                                   {" "}
                                   <h1 className="lg:text-4xl text-3xl font-bold">
                                        {" "}
                                        <Balancer>
                                             {" "}
                                             O&apos;zbekistonga jadal islohotlarga mos malakali kadrlar
                                             kerak{" "}
                                        </Balancer>{" "}
                                   </h1>{" "}
                                   <p className="lg:text-2xl text-xl font-medium text-right">
                                        Sh.M Mirziyoyev
                                   </p>{" "}
                                   <Button variant={"secondary"} size={"lg"} className="w-fit">
                                        {" "}
                                        Kursni boshlash{" "}
                                   </Button>{" "}
                              </div>{" "}
                              <div>
                                   {" "}
                                   <Icons.pattern className="w-full object-cover absolute top-0 left-0" />{" "}
                              </div>{" "}
                         </div>{" "}
                         <div className="flex-1 relative md:block hidden">
                              {" "}
                              <div className="h-full w-full bg-primary absolute rounded-r-lg z-10 opacity-50"></div>{" "}
                              <Image
                                   src="/hero-img.png"
                                   alt="Hero"
                                   fill
                                   className="rounded-r-lg !relative"
                              />{" "}
                         </div>
                    </SwiperSlide>{" "}
               </Swiper>{" "}
          </>
     );
}
