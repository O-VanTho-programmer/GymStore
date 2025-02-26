'use client';

import React from 'react'
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';
const Navar = dynamic(() => import('../Navar/Navar'), { ssr: false })


function NavWrapper() {
    const pathname = usePathname();
    const noNavPaths = [
        "/login", "/sign_up",

    ];
    const shouldHideNav = noNavPaths.includes(pathname) || pathname.startsWith('/store') || pathname.startsWith('/admin') ;

    return !shouldHideNav ? <Navar /> : null;
}

export default NavWrapper