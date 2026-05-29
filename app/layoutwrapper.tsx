"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Navigation } from "@/components/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isPublicPage =
    pathname === "/" ||
    pathname === "/signin" ||
    pathname.includes("sign-in") ||
    pathname.includes("sign-up");

  const isProtectedPage = pathname.startsWith("/chat");

  useEffect(() => {
    if (isProtectedPage) {
      const userId = localStorage.getItem("userId"); 
      if (!userId) {
        router.push("/signin"); 
      }
    }
  }, [pathname]);

  if (isPublicPage) {
    return (
      <>
        <Navigation />
        <main className="flex items-center justify-center h-screen">
          {children}
        </main>
      </>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}