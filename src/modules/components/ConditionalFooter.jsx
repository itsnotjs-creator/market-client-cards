"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hideFooterPaths = ["/dashboard"];

  const shouldHideFooter = hideFooterPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (shouldHideFooter) {
    return null;
  }

  return <SiteFooter />;
}
