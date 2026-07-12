"use client";

import { useNotifications } from "@/components/notifications/notifications-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSearchParamsHandler() {
  const searchParams = useSearchParams();
  const { addNotification } = useNotifications();

  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

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

  return null;
}
