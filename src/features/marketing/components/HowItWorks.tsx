import {
  CloudUploadIcon,
  FileTextIcon,
  PencilSparklesIcon,
} from "lucide-react";

const steps = [
  {
    icon: CloudUploadIcon,
    label: "Upload audio/video",
    description:
      "Drag and drop your file into our app. We support all major formats including MP4, MP3, WAV, and MOV.",
  },
  {
    icon: PencilSparklesIcon,
    label: "AI transcribes",
    description: "Our AI model processes your media with utmost accuracy.",
  },
  {
    icon: FileTextIcon,
    label: "Review & export",
    description:
      "Use the transcript view to review your text and export to SRT, VTT, or TXT in one click.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="max-w-7xl mx-auto px-6 flex flex-col items-center"
    >
      <h2 className="text-3xl font-bold text-ws-text-primary text-center tracking-tight mb-16">
        Effortless Workflow
      </h2>

      {/* DaisyUI steps — horizontal on md+, vertical on mobile */}
      <ul className="steps steps-vertical md:steps-horizontal justify-center w-full max-w-7xl mx-auto">
        {steps.map(({ icon: Icon, label, description }, i) => (
          <li
            key={i}
            className="step step-neutral"
            data-content={String(i + 1)}
          >
            <div className="flex flex-col items-center text-center space-y-3 px-4 pb-6 md:pb-0">
              {/* Icon box */}
              <div className="indicator mt-4">
                <div className="w-14 h-14 bg-ws-background border border-ws-border rounded-xl flex items-center justify-center shadow-sm group hover:border-ws-text-secondary transition-all duration-300">
                  <Icon className="text-ws-text-secondary" />
                </div>
              </div>

              <h3 className="font-semibold text-ws-text-primary text-base">
                {label}
              </h3>
              <p className="text-sm text-ws-text-muted max-w-xs leading-relaxed">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
