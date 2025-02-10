'use client';

import React from 'react'
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';
const NavStore = dynamic(() => import('../NavStore/NavStore'), { ssr: false })


function NavStoreWrapper() {
    const pathname = usePathname();
    const noNavStorePaths = [
        "/login", "/sign_up", "/", 
        "/admin/dashboard", 
        "/admin/dashboard/overview", 
        "/admin/dashboard/products",
        "/admin/dashboard/client",
        "/admin/dashboard/pt_management",
        "/admin/dashboard/products/add_product",
        "/world",
        "/find_pt"
        
    ];
    return !noNavStorePaths.includes(pathname) ? <NavStore /> : null;
}

export default NavStoreWrapper