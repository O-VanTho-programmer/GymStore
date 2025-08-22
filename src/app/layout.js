import "./globals.css";
import FooterWrapper from "@/components/FooterWarpper/FooterWarpper";
import NavStoreWrapper from "@/components/NavStoreWrapper/NavStoreWrapper";
import { UserProvider } from "@/context/UserContext";
import NavWrapper from "@/components/NavWrapper/NavWrapper";
import { SearchProvider } from "@/context/SearchContext";
import { QuantityOrderProvider } from "@/context/QuantityOrderProvider";
import { LoadingProvider } from "@/context/LoadingContext";

export const metadata = {
  title: "Gym Store",
  description: "Gym Store and PT Searcher",
  icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="relative">
        <UserProvider>
          <LoadingProvider>
            <QuantityOrderProvider>
              <SearchProvider>
                {/* <GlobalLoadingBar /> */}
                <NavWrapper />
                <NavStoreWrapper />
                {children}
                <FooterWrapper />
              </SearchProvider>
            </QuantityOrderProvider>
          </LoadingProvider>
        </UserProvider>
      </body>
    </html>
  );
}
