import {useRouter} from "next/router";
import {getCourseBySlug} from "@/lib/courses";
import {notFound} from "next/navigation";
import CourseLayout from "@/components/layout/CourseLayout";
import Image from "next/image";

export default  function Page() {
    const router = useRouter();
    const course = getCourseBySlug(router.query.slug)

    if(!course) return notFound();

    return (
        <>
            <CourseLayout>
                <div className="flex-1 max-w-5xl flex flex-col gap-6 py-9">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-6 flex-1">
                            <div className="flex flex-col gap-4">
                                <h4 className={'font-bold text-2xl text-second'}>{course.title}</h4>
                                <p className={'text-muted-foreground text-base'}>{course.description}</p>
                            </div>
                        </div>
                        <Image src={course.image} alt={course.title} width={520} height={294}
                               className="rounded border border-border"/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col rounded border border-border bg-background py-2"></div>
                    </div>
                </div>
            </CourseLayout>
        </>
    )
}