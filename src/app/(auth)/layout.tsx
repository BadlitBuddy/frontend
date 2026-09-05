"use client";

import Header from "@/features/marketing/components/Header";
import ProductPreview from "./_components/ProductPreview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@/components/notifications/notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        data-theme="badlitbuddy"
        className="min-h-screen flex flex-col bg-base-100 antialiased font-sans select-none"
      >
        <Notifications />
        <Header />
        <main className="grow grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center items-center px-6 py-12 md:px-12 bg-base-100">
            <div className="w-full max-w-md">{children}</div>
          </div>

          <ProductPreview />
        </main>
      </div>
    </QueryClientProvider>
  );
}
