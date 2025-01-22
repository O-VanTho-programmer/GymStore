'use client';

import React from 'react'
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';
const NavStore = dynamic(() => import('../NavStore/NavStore'), { ssr: false })


function NavStoreWrapper() {
    const pathname = usePathname();
    const noFooterPaths = ["/login", "/sign_up", "/"];
    return !noFooterPaths.includes(pathname) ? <NavStore /> : null;
}

export default NavStoreWrapper