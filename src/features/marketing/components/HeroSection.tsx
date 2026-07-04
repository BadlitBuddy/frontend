import Image from "next/image";
import UploadZone from "./UploadZone";

export default function HeroSection() {
  return (
    <section id="home" className="hero min-h-[70vh] bg-base-100 py-12 md:py-20">
      <div className="hero-content max-w-7xl w-full px-6 flex-col lg:flex-row gap-12 lg:gap-8 justify-between items-center">
        <div className="flex-1 flex flex-col space-y-6 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-[1.1]">
            Flawless transcriptions in minutes.
          </h1>
          <p className="text-base text-base-content/80 leading-relaxed">
            Professional-grade AI transcription for your audio and video files.
            Fast, accurate, and secure. Built for high-volume workflows and
            precision editing.
          </p>
          <div className="pt-4">
            <UploadZone />
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="mockup-browser border border-base-300 bg-base-100 shadow-2xl">
            <div className="mockup-browser-toolbar">
              <div className="input border border-base-300 text-xs text-base-content/70 select-none">
                {/* //TODO: Update with actual app url  */}
                wordscribe.ai/editor/project_12
              </div>
            </div>
            <div className="bg-base-200 relative aspect-[1.46] overflow-hidden">
              {/* //TODO: Update with actual dashboard image */}
              <Image
                src="/images/dashboard-mockup.png"
                alt="WordScribe AI Dashboard Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
