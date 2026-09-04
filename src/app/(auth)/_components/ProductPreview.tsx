import Image from "next/image";

export default function ProductPreview() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-base-200 p-12 border-l border-base-300">
      <div className="mockup-browser w-full max-w-2xl border border-base-300 bg-base-100 shadow-2xl">
        <div className="mockup-browser-toolbar">
          <div className="input border border-base-300 text-xs text-base-content/70 select-none">
            transcripts/editor/project_12
          </div>
        </div>
        <div className="bg-base-200 relative aspect-[1.72] overflow-hidden">
          <Image
            src="/images/product-demo.webp"
            alt="Transcription Dashboard Preview"
            height={958}
            width={1650}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
