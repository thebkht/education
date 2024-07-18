import Sidebar from '@/components/layout/SideMenu';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';
import { cn } from '@/lib/utils';
import React from 'react';

export default function Index({ children, className }: { children: React.ReactNode, className?: string }) {
     const [collapsed, setCollapsed] = React.useState<boolean>(false);

     return (
          <>
               <div className={cn(styles.main, collapsed && styles.collapsed)}>
                    <div className="flex z-50">
                         <div className={`flex-[1_1_1px] ${collapsed ? "w-[72px]" : "w-[250px]"} h-14 px-4 justify-center flex flex-col fixed z-50 border-r border-border box-border`}>
                              <Link href="/" className={"cursor-pointer relative flex select-none border-none"}>
                                   <Image src={collapsed ? "/favicon.ico" : "/logo.png"} alt="Logo" width={collapsed ? 45 : 141} height={45} className='transition-all duration-300 ease-in-out' />
                              </Link>
                         </div>
                    </div>
                    <Header collapsed={collapsed} onCollapse={setCollapsed} />
                    <Sidebar collapsed={collapsed} />
                    <main className="flex relative justify-center z-0 min-h-0 min-w-0 flex-[1_0_auto] md:flex-none bg-accent">
                         <div className="flex w-full flex-[1_0_auto]">
                              <div className="flex flex-1 min-w-0">
                                   <div className="flex justify-center flex-[1_0_1px] min-w-0 [overflow-anchor:none] overflow-x-auto">
                                        <div className="flex px-4 flex-1 min-w-0">
                                             <div className={cn("flex flex-1 justify-center min-w-0", className)}>
                                                  <div className="flex flex-col py-4 w-full">
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