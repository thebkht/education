import React from "react";
import {cn} from "@/lib/utils";

export default function Index({value, title = "Umumiy savollar soni", className, valueClass}: {value: number, title?: string, className?: string, valueClass?: string}) {
    return (
        <>
            <div
                className={cn("flex flex-col justify-center items-center font-semibold text-2xl rounded-lg py-9 gap-6 w-96 bg-accent2 text-second-foreground", className)}>
                {title}
                <span className={cn("font-bold text-5xl", valueClass)}>
                                {value}
                            </span>
            </div>
        </>
    )
}