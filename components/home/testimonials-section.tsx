import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function TestimonialSection() {
     return (
          <>
               <div className="flex flex-col gap-2 mx-auto container xl:p-0 px-4">
                    <div className="flex-1">
                         <h3 className="text-2xl font-bold text-second">Kurslar haqida fikr-mulohaza</h3>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                         <Swiper
                              modules={[Autoplay, A11y]}
                              slidesPerView={3}
                              spaceBetween={12}
                              className="w-full"
                              loop
                              autoplay={{
                                   delay: 2500,
                                   disableOnInteraction: false,
                              }}
                         >
                              {
                                   testimonials.map((testimonial, index) => (
                                        <SwiperSlide key={index}>
                                             <TestimonialCard key={index} testimonial={testimonial} />
                                        </SwiperSlide>
                                   ))
                              }
                         </Swiper>
                    </div>
               </div>
          </>
     )
}