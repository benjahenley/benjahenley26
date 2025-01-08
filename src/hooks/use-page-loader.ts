"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoading } from "@/presentation/components/providers/Loader";

export default function usePageLoader() {
  const router: any = useRouter();
  const { setLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, setLoading]);
}
