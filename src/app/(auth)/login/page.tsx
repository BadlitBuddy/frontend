"use client";

import GoogleChromeIcon from "@/components/icons/GoogleChromeIcon";
import Link from "next/link";
import { Suspense } from "react";
import AuthSearchParamsHandler from "../_components/AuthSearchParamsHandler";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Suspense fallback={null}>
        <AuthSearchParamsHandler />
      </Suspense>

      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-base-content sm:text-5xl">
          Welcome back
        </h1>
        <p className="mt-4 text-base text-base-content/60">
          Sign in to continue transcribing
        </p>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={handleGoogleLogin}
          className="btn btn-neutral w-full normal-case text-base font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 border border-base-300 shadow-md hover:bg-neutral-800 transition-all duration-200"
        >
          <GoogleChromeIcon size={20} />
          Continue with Google
        </button>
      </div>

      <div className="mt-12 text-sm text-base-content/60">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Sign up for free
        </Link>
      </div>
    </div>
  );
}
