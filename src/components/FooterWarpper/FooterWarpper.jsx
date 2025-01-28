'use client';

import { usePathname } from "next/navigation";
import Footer from "../Footer/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const noFooterPaths = [
    "/login", "/sign_up", "/",
    "/admin/dashboard",
    "/admin/dashboard/overview",
    "/admin/dashboard/products",
    "/admin/dashboard/user",
    "/admin/dashboard/pt_management",
    "/admin/dashboard/transactions"
  ];

  return !noFooterPaths.includes(pathname) ? <Footer /> : null;
}
