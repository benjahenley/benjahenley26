"use client";

import { Locales } from "@/infraestructure/interfaces";
import HomeComp from "@/presentation/components/ui/main";

export default function Home({
  params: { locale },
}: Readonly<{
  params: { locale: Locales };
}>) {
  return (
    <>
      <HomeComp locale={locale ? locale : "es"} />
    </>
  );
}
