import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="card card-border max-w-4xl mx-auto shadow-sm hover:shadow-md transition-shadow bg-ws-surface ">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl md:text-3xl font-bold tracking-tight text-ws-text-primary mb-2">
            Ready to streamline your workflow?
          </h2>
          <div className="card-actions flex-col items-center gap-2 mt-4">
            <Link href="/signup" className="btn btn-primary btn-lg">
              Start Transcribing Now
            </Link>
            <p className="text-xs text-ws-text-muted">
              No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
