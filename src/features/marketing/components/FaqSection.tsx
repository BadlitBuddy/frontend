const faqs = [
  {
    question: "How accurate is the transcription?",
    answer:
      "Our system delivers near-human transcription accuracy. Powered by Whisper a highly powerful model in speech recognition, it effortlessly processes complex vocabulary, diverse accents, and overlapping conversations. Whether it's a crisp studio podcast or a noisy Zoom call, you can expect highly precise transcripts every time.",
    defaultOpen: true,
  },
  {
    question: "What file formats do you support?",
    answer:
      "We support all major audio and video formats including but not limited to MP3, MP4, WAV, M4A, AAC, MOV, and AVI.",
  },
  {
    question: "Can I export to subtitles (SRT)?",
    answer:
      "Yes, you can export your transcriptions to standard subtitle formats like SRT, VTT, and plain text TXT.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All uploads are ephemeral, meaning once your transcription is complete and downloaded, your audio files are immediately purged from our servers.",
  },
  // {
  //   question: "Is there a free plan?",
  //   answer:
  //     "Yes, we offer a Free plan with 15 minutes of transcription per device, and up to 1 hour 30 minutes of total credits when you sign up for a free account.",
  // },
  {
    question: "What languages do you support?",
    answer:
      "Our Transcription Model supports transcription for over 99 languages, including English, Spanish, French, German, Japanese, Mandarin, and Arabic.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-ws-text-primary text-center tracking-tight mb-16">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map(({ question, answer, defaultOpen }) => (
          <div
            key={question}
            className="collapse collapse-arrow border border-ws-border bg-ws-surface rounded-lg"
          >
            <input
              type="radio"
              name="faq-accordion"
              defaultChecked={defaultOpen}
            />
            <div className="collapse-title text-base font-semibold text-ws-text-primary">
              {question}
            </div>
            <div className="collapse-content text-sm text-ws-text-muted leading-relaxed border-t border-ws-border pt-4">
              {answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
