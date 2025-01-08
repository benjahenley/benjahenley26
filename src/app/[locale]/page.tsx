"use client";

import { Locales } from "@/infraestructure/interfaces";
import client from "@/lib/apolloClient";
import HomeComp from "@/presentation/components/pages/home";
import { ApolloProvider } from "@apollo/client";

export default function Home({
  params: { locale },
}: Readonly<{
  params: { locale: Locales };
}>) {
  return (
    <>
      <ApolloProvider client={client}>
        <HomeComp locale={locale ? locale : "es"} />
      </ApolloProvider>
    </>
  );
}
