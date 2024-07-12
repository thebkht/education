import { Icons } from "@/components/icons";
import Badge from "@/components/UI/Badge";
import Button from "@/components/UI/Button";

export default function Index() {
     return (
          <>
               <div className="flex h-14 flex-[0_0_auto]">
                    <div className="flex flex-[1_1_1px] py-2 px-6 box-border fixed h-14 w-[calc(100vw-250px)] border-b z-40 justify-between items-center">
                         <div className="flex items-center gap-4">
                              <div className="font-medium text-second text-lg">
                                   Обучение
                              </div>
                              <Badge>Мои курсы</Badge>
                         </div>
                         <div className="flex gap-6 items-center">
                              <Button className="flex gap-2 rounded-[4px] py-2.5 px-2 bg-background border-none text-foreground">
                                   <span className="text-sm text-second font-medium">jz015yv4</span>
                                   <Icons.chevronDown className="w-3" />
                              </Button>
                              <div className="h-10 w-10 bg-primary/10 rounded-full flex justify-center items-center">
                                   <Icons.user className="h-5 w-5 text-primary" />
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}