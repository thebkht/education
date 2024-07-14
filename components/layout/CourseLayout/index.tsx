import Sidebar from '@/components/layout/SideMenu';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import Image from 'next/image';

export default function Index({ children }: { children: React.ReactNode }) {
     return (
          <>
               <div className="main-grid">
                    <div className="flex z-50">
                         <div className="flex-[1_1_1px] w-[250px] h-14 flex flex-col fixed z-50 border-r border-border box-border">
                              <Link href="/" className={"cursor-pointer relative flex select-none border-none"}>
                                   <Image src="/logo.png" alt="Logo" width={175} height={56} />
                              </Link>
                         </div>
                    </div>
                    <Header />
                    <Sidebar />
                    <main className="flex relative justify-center z-0 min-h-0 min-w-0 flex-[1_0_auto] md:flex-none bg-accent">
                         <div className="flex w-full flex-[1_0_auto]">
                              <div className="flex flex-1 min-w-0">
                                   <div className="flex justify-center flex-[1_0_1px] min-w-0 [overflow-anchor:none] overflow-x-auto">
                                        <div className="flex px-4 flex-1 min-w-0">
                                             <div className="flex flex-1 justify-center min-w-0">
                                                  <div className="flex flex-col py-4">
                                                       {children}
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </main>
               </div>
          </>
     )
}