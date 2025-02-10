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
    "/admin/dashboard/client",
    "/admin/dashboard/pt_management",
    "/admin/dashboard/transactions",
    "/admin/dashboard/products/add_product"
  ];

  return !noFooterPaths.includes(pathname) ? <Footer /> : null;
}
