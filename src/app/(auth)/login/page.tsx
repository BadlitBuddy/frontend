"use client";

import GoogleChromeIcon from "@/components/icons/GoogleChromeIcon";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-base-content sm:text-5xl">
          Welcome back
        </h1>
        <p className="mt-4 text-base text-base-content/60">
          Sign in to continue transcribing
        </p>
      </div>

      <div className="w-full space-y-4">
        {/* //TODO: implement Google SSO button */}
        <button
          onClick={() => {
            window.location.href = "/dashboard";
          }}
          className="btn btn-neutral w-full normal-case text-base font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 border border-base-300 shadow-md hover:bg-neutral-800 transition-all duration-200"
        >
          <GoogleChromeIcon size={20} />
          Continue with Google
        </button>

        <p className="text-xs text-base-content/40 mt-3">
          Secure SSO only. No password needed.
        </p>
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
