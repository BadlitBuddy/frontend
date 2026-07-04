import {
  BadgeCheckIcon,
  EarthIcon,
  HatGlassesIcon,
  ZapIcon,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-left mb-10">
          <span className="badge badge-ghost badge-sm tracking-wider uppercase font-bold text-ws-text-muted">
            CORE CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ws-text-primary mt-2">
            Engineered for Accuracy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 99% Accuracy Card */}
          <div className="card card-border bg-ws-surface md:col-span-2 hover:shadow-md transition-shadow">
            <div className="card-body space-y-4">
              <span className="w-10 h-10 rounded-full bg-ws-background border border-ws-border flex items-center justify-center text-ws-text-primary">
                <BadgeCheckIcon />
              </span>
              <h3 className="card-title text-ws-text-primary">99% Accuracy</h3>
              <p className="text-sm text-ws-text-muted leading-relaxed max-w-lg">
                Built on advanced neural models trained on millions of hours of
                diverse speech patterns to ensure near-perfect results every
                time.
              </p>
            </div>
          </div>

          {/* 99 Languages Card */}
          <div className="card card-border bg-ws-surface hover:shadow-md transition-shadow">
            <div className="card-body space-y-4">
              <span className="w-10 h-10 rounded-full bg-ws-background border border-ws-border flex items-center justify-center text-ws-text-primary">
                <EarthIcon />
              </span>
              <h3 className="card-title text-ws-text-primary">99 Languages</h3>
              <p className="text-sm text-ws-text-muted leading-relaxed">
                Global support for transcription and translation, from English
                to Mandarin and beyond.
              </p>
            </div>
          </div>

          {/* Instant Processing Card */}
          <div className="card card-border bg-ws-surface hover:shadow-md transition-shadow">
            <div className="card-body space-y-4">
              <span className="w-10 h-10 rounded-full bg-ws-background border border-ws-border flex items-center justify-center text-ws-text-primary">
                <ZapIcon />
              </span>
              <h3 className="card-title text-ws-text-primary">
                Instant Processing
              </h3>
              <p className="text-sm text-ws-text-muted leading-relaxed">
                Process hours of high-fidelity audio in mere minutes without
                compromising on quality.
              </p>
            </div>
          </div>

          {/* Zero-Trace Privacy Card */}
          <div className="card bg-ws-primary md:col-span-2 overflow-hidden relative group">
            <div className="card-body flex-row items-center justify-between gap-6">
              <div className="space-y-4 max-w-md z-10">
                <h3 className="card-title text-ws-surface">
                  Zero-Trace Privacy
                </h3>
                <p className="text-sm text-ws-surface/60 leading-relaxed">
                  {
                    "We don't store your data. Once your transcription is complete and downloaded, your audio files are immediately purged from our servers."
                  }
                </p>
              </div>
              {/* Floating Shield Graphic */}
              <div className="opacity-20 group-hover:opacity-30 transition-opacity absolute right-8 top-1/2 -translate-y-1/2 md:relative md:top-auto md:translate-y-0 shrink-0 md:opacity-30">
                <HatGlassesIcon size={100} className="text-ws-surface/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
