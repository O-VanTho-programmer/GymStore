'use client';

import { usePathname } from "next/navigation";
import Footer from "../Footer/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const noFooterPaths = [
    "/login", "/sign_up", "/",
  ];

  const shouldHideFooter = noFooterPaths.includes(pathname) || pathname.startsWith('/admin') || pathname.startsWith('/user');

  return !shouldHideFooter ? <Footer /> : null;
}
