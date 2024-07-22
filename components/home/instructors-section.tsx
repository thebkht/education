import InstructorCard from "@/components/InstructorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import { Teacher } from "@/lib/types";

export function InstructorSection({ teachers }: { teachers: Teacher[] }) {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-2 px-4 xl:p-0">
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
          {teachers.map((instructor: Teacher, index) => (
            <SwiperSlide key={index}>
              <InstructorCard instructor={instructor} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
