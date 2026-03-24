"use client";

import { Locales } from "@/infraestructure/interfaces";
import HomeComp from "@/presentation/components/ui/main";
import { Suspense } from "react";

export default function Home({
  params: { locale },
}: Readonly<{
  params: { locale: Locales };
}>) {
  return (
    <Suspense>
      <HomeComp locale={locale ? locale : "es"} />
    </Suspense>
  );
}
