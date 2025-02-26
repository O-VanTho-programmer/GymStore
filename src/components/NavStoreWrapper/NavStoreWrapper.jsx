'use client';

import React from 'react'
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';
const NavStore = dynamic(() => import('../NavStore/NavStore'), { ssr: false })


function NavStoreWrapper() {
    const pathname = usePathname();
    const noNavStorePaths = [
        "/login", "/sign_up", "/",
        "/world",

    ];
    const shouldHideNav = noNavStorePaths.includes(pathname) || pathname.startsWith('/find_pt') || pathname.startsWith('/admin') || pathname.startsWith('/my_profile') || pathname.startsWith('/payment');

    return !shouldHideNav ? <NavStore /> : null;
}

export default NavStoreWrapper