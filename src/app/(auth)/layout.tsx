"use client";

import Header from "@/features/marketing/components/Header";
import ProductPreview from "./_components/ProductPreview";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-theme="wordscribe"
      className="min-h-screen flex flex-col bg-base-100 antialiased font-sans select-none"
    >
      <Header />
      <main className="grow grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center px-6 py-12 md:px-12 bg-base-100">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <ProductPreview />
      </main>
    </div>
  );
}
