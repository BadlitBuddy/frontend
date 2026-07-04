import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-ws-text-primary text-center tracking-tight mb-16">
        Pricing
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Card */}
        <div className="card card-border bg-ws-surface hover:shadow-md transition-shadow">
          <div className="card-body">
            <div className="mb-4">
              <h3 className="card-title text-ws-text-primary">Free</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-5xl font-extrabold text-ws-text-primary">
                  $0
                </span>
              </div>
              <p className="text-xs text-ws-text-muted mt-1.5">
                Forever to try
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 grow">
              {[
                "15 minutes per device limit (No account required)",
                "Up to 1 hour and 30 minutes per week when you sign up",
                "99 languages",
                "Any audio/video format upload",
                "Export to TXT, SRT, VTT",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-ws-text-secondary"
                >
                  <CheckIcon
                    size={20}
                    className="text-ws-success mt-0.5 shrink-0"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="card-actions mt-8">
              <Link
                href="/signup"
                className="btn btn-outline btn-block btn-sm text-ws-text-primary border-ws-border hover:bg-ws-background hover:text-ws-text-primary hover:border-ws-border"
              >
                Start Free — No Card
              </Link>
            </div>
          </div>
        </div>

        {/* Pro Card */}
        <div className="card bg-ws-primary text-ws-surface shadow-xl">
          <div className="card-body">
            <div className="mb-4">
              <h3 className="card-title text-ws-surface">Pro</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-5xl font-extrabold text-ws-surface">
                  $6.99
                </span>
              </div>
              <p className="text-xs text-ws-surface/60 mt-1.5">
                /month | 300 minutes
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 grow">
              {[
                "Everything in Free, plus",
                "300 additional minutes per month",
                "Priority processing",
                "AI summarizer",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-ws-surface/80"
                >
                  <CheckIcon
                    size={20}
                    className="text-sky-400 mt-0.5 shrink-0"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="card-actions mt-8">
              <Link
                href="/signup"
                className="btn btn-block btn-sm bg-ws-surface! text-ws-text-primary! hover:opacity-90 border-none"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Subtexts */}
      <div className="text-center mt-12 space-y-2">
        <p className="text-xs text-ws-text-muted">
          Cancel anytime. No credit card required for Free. Monthly plans only.
        </p>
        {/* <p className="text-xs text-ws-text-secondary font-medium">
          Need flexibility? Try pay-as-you-go at $0.10 per minute — no
          subscription required.
        </p> */}
      </div>
    </section>
  );
}
