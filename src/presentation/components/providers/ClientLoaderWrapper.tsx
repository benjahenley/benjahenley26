"use client";

import React from "react";
import { useLoading } from "@/presentation/components/providers/Loader";
import usePageLoader from "@/hooks/use-page-loader";
import PageLoader from "../ui/PageLoader";

export default function ClientLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useLoading();
  usePageLoader();

  return (
    <>
      {isLoading && <PageLoader />}
      {children}
    </>
  );
}
