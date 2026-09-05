"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { CheckIcon } from "lucide-react";
import GoogleChromeIcon from "@/components/icons/GoogleChromeIcon";
import { useNotifications } from "@/components/notifications/notifications-store";
import AuthSearchParamsHandler from "../_components/AuthSearchParamsHandler";

export default function SignupPage() {
  const [agreed, setAgreed] = useState(false);

  const { addNotification } = useNotifications();

  const handleGoogleSignup = () => {
    if (!agreed) {
      addNotification({
        type: "error",
        title: "Terms not accepted",
        message:
          "Please agree to the terms and conditions before creating an account.",
      });
      return;
    }

    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/users/signup?hasAcceptedTerms=${agreed ? "true" : "false"}`;
  };

  return (
    <div className="flex flex-col items-start text-left w-full">
      <Suspense fallback={null}>
        <AuthSearchParamsHandler />
      </Suspense>

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-base-content sm:text-5xl leading-tight">
          Create your free account
        </h1>
        <p className="mt-4 text-base text-base-content/65">
          Start transcribing in minutes — no credit card required.
        </p>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={handleGoogleSignup}
          className="btn btn-neutral w-full normal-case text-base font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 border border-base-300 shadow-md hover:bg-neutral-800 transition-all duration-200"
        >
          <GoogleChromeIcon size={20} />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 py-1">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="checkbox checkbox-sm checkbox-primary rounded mt-1 border-base-300"
          />
          <label
            htmlFor="terms"
            className="text-sm text-base-content/70 cursor-pointer select-none"
          >
            I agree to the{" "}
            <a
              href="/terms"
              className="font-semibold text-base-content hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-semibold text-base-content hover:underline"
            >
              Privacy Policy
            </a>
          </label>
        </div>
      </div>

      <div className="w-full border-t border-base-300 my-6"></div>

      <ul className="space-y-3 w-full text-sm text-base-content/85">
        <li className="flex items-center gap-3">
          <CheckIcon size={16} className="text-base-content shrink-0" />
          <span>300 minutes of free transcription per month</span>
        </li>
        <li className="flex items-center gap-3">
          <CheckIcon size={16} className="text-base-content shrink-0" />
          <span>99 languages supported</span>
        </li>
        <li className="flex items-center gap-3">
          <CheckIcon size={16} className="text-base-content shrink-0" />
          <span>Export to TXT, SRT, VTT</span>
        </li>
      </ul>

      <div className="mt-12 text-sm text-base-content/65">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-base-content hover:underline transition-colors"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
