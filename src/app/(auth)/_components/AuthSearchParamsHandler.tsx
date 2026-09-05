"use client";

import { useNotifications } from "@/components/notifications/notifications-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSearchParamsHandler() {
  const searchParams = useSearchParams();
  const { addNotification } = useNotifications();

  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const isSignUpSuccess = searchParams.get("signUpSuccess");

  useEffect(() => {
    if (error) {
      addNotification({
        type: "error",
        title: error,
        message: errorDescription || "An error occurred during login.",
        duration: 4500,
      });
    }
  }, [error, errorDescription, addNotification]);

  useEffect(() => {
    if (isSignUpSuccess === "true") {
      addNotification({
        type: "success",
        title: "Signup successful",
        message: "You have successfully signed up.",
        duration: 4500,
      });
    }
  }, [isSignUpSuccess, addNotification]);

  return null;
}
