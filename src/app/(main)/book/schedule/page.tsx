"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function RedirectContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const primaryParam = searchParams.get("primary");

  React.useEffect(() => {
    const primaryId = primaryParam ? parseInt(primaryParam.trim(), 10) : null;
    if (primaryId && !isNaN(primaryId)) {
      router.push(`/schedule?appointmentType=${primaryId}`);
    } else {
      router.push("/schedule");
    }
  }, [primaryParam, router]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto text-center p-8 shadow-xl">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
        <CardTitle className="text-2xl">Redirecting to Secure Checkout...</CardTitle>
        <CardDescription className="mt-2">
          Please complete your booking and payment in our secure scheduler.
        </CardDescription>
      </Card>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto text-center p-12">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
          <CardTitle>Loading...</CardTitle>
        </Card>
      </div>
    }>
      <RedirectContent />
    </Suspense>
  );
}
