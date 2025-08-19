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
    const shouldHideNav = noNavPaths.includes(pathname) || pathname.startsWith('/store') || pathname.startsWith('/settings') || pathname.startsWith('/admin') || pathname.startsWith('/calculate_tool') || pathname.startsWith('/cart') || pathname.startsWith('/user');

    return !shouldHideNav ? <Navar /> : null;
}

export default NavWrapper