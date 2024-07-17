import CourseLayout from "@/components/layout/CourseLayout";
import Image from "next/image";
import Button from "@/components/UI/Button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/router";

export default function CertificatePage() {
     const router = useRouter();
     const { slug: courseId } = router.query;
     return (
          <>
               <CourseLayout>
                    <div className="flex flex-col rounded-2xl p-6 gap-24 bg-background flex-[1_0_auto] w-full items-center justify-center max-w-[1622px] max-h-[976px]">
                         <Image src="/certificate.png" alt="Certificate" width={944} height={654} className="!relative" />
                         <Button size="sm" className="h-10 font-medium gap-2">
                              Скачать сертификат
                              <Icons.download className={"h-5 w-5"} />
                         </Button>
                    </div>
               </CourseLayout>
          </>
     )
}