import { useEffect } from "react";

import {
  InfoIcon,
  CircleAlertIcon,
  CircleXIcon,
  CircleCheckIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

const DEFAULT_DURATION = 2500;

const icons = {
  info: <InfoIcon className="size-6 " aria-hidden="true" />,
  success: <CircleCheckIcon className="size-6 " aria-hidden="true" />,
  warning: <CircleAlertIcon className="size-6 " aria-hidden="true" />,
  error: <CircleXIcon className="size-6 " aria-hidden="true" />,
};

export type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
    duration?: number;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message, duration },
  onDismiss,
}: NotificationProps) => {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onDismiss(id);
    }, duration ?? DEFAULT_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [duration, id, onDismiss]);

  return (
    <div className="toast toast-start">
      <div className={cn("alert", `alert-${type}`)}>
        <div className="shrink-0">{icons[type]}</div>
        <div>
          <span className="font-semibold">{title}</span>
          {message && <span className="block">{message}</span>}
        </div>
      </div>
    </div>
  );
};
