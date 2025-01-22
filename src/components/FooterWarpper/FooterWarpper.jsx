'use client';

import { usePathname } from "next/navigation";
import Footer from "../Footer/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const noFooterPaths = ["/login", "/register"];

  return !noFooterPaths.includes(pathname) ? <Footer /> : null;
}
