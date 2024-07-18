import InstructorCard from "@/components/InstructorCard";
import { instructors } from "@/data/instructors";
import { Swiper, SwiperSlide } from "swiper/react";
import {
     Navigation,
     Pagination,
     A11y,
     Autoplay
}

     from "swiper/modules";
import "swiper/css";

export function InstructorSection() {
     return (<>
          <div className="flex flex-col gap-2 mx-auto container xl:p-0 px-4">
               <div className="flex-1">
                    <h3 className="text-2xl font-bold">Bizning o&apos;qituvchilar</h3>
               </div>
               <Swiper
                    modules={[Autoplay, A11y]}
                    slidesPerView={4}
                    spaceBetween={24}
                    className="w-full"
                    loop
                    autoplay={{
                         delay: 2500,
                         disableOnInteraction: false,
                    }}
               >
                    {
                         instructors.map((instructor, index) => (
                              <SwiperSlide key={index}>
                                   <InstructorCard instructor={instructor} />
                              </SwiperSlide>
                         ))
                    }
               </Swiper>
          </div>
     </>)
}