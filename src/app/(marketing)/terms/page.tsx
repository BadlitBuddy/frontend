"use client";

import {
  BulletList,
  Callout,
  LegalDocumentLayout,
  Prose,
  SectionHeading,
} from "../_components/LegalDocumentLayout";

const TOC_SECTIONS = [
  { id: "acceptance-of-terms", label: "Acceptance of Terms" },
  { id: "the-service", label: "The Service" },
  { id: "eligibility-and-accounts", label: "Eligibility and Accounts" },
  {
    id: "your-uploads-and-responsibilities",
    label: "Your Uploads and Responsibilities",
  },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "content-ownership", label: "Content Ownership" },
  {
    id: "ai-and-third-party-processing",
    label: "AI and Third-Party Processing",
  },
  { id: "transcription-accuracy", label: "Transcription Accuracy" },
  { id: "credits-limits-and-payments", label: "Credits, Limits, and Payments" },
  { id: "storage-and-deletion", label: "Storage and Deletion" },
  { id: "service-availability", label: "Service Availability" },
  { id: "suspension-and-termination", label: "Suspension and Termination" },
  { id: "privacy", label: "Privacy" },
  {
    id: "disclaimers-and-limitation-of-liability",
    label: "Disclaimers and Limitation of Liability",
  },
  { id: "changes-to-these-terms", label: "Changes to These Terms" },
  { id: "governing-law-and-contact", label: "Governing Law and Contact" },
];

export default function TermsPage() {
  return (
    <LegalDocumentLayout
      title="Terms of Service"
      description="Please read these terms carefully before using Badlit Buddy. They govern your access to and use of our service."
      lastUpdated="September 2, 2026"
      sections={TOC_SECTIONS}
    >
      <SectionHeading n={1} id="acceptance-of-terms">
        Acceptance of Terms
      </SectionHeading>
      <Prose>
        By accessing or using Badlit Buddy, you agree to these Terms and our
        Privacy Policy.
      </Prose>
      <Prose>
        You must comply with these Terms and all applicable laws when using the
        Service.
      </Prose>

      <SectionHeading n={2} id="the-service">
        The Service
      </SectionHeading>
      <Prose>
        Badlit Buddy allows you to upload audio or video files and receive
        automatically generated transcriptions.
      </Prose>
      <Prose>
        Depending on the features available, Badlit Buddy may provide
        transcripts with timestamps, speaker identification, translations, and
        exports in formats such as TXT, SRT, VTT, and JSON.
      </Prose>
      <Prose>
        The Service uses automated AI transcription technology and third-party
        infrastructure to process your files.
      </Prose>
      <Prose>We may change, add, or remove features over time.</Prose>

      <SectionHeading n={3} id="eligibility-and-accounts">
        Eligibility and Accounts
      </SectionHeading>
      <Prose>
        You must be at least <strong>13 years old</strong> to use Badlit Buddy.
      </Prose>
      <Prose>
        Some features may be available without an account. Other features may
        require an account, which may be created through supported
        authentication providers such as Google.
      </Prose>
      <Prose>
        You are responsible for keeping access to your account secure and for
        activity conducted through your account.
      </Prose>
      <Prose>
        You agree to provide accurate information when creating an account.
      </Prose>

      <SectionHeading n={4} id="your-uploads-and-responsibilities">
        Your Uploads and Responsibilities
      </SectionHeading>
      <Prose>
        You are responsible for the files and content you upload to Badlit
        Buddy.
      </Prose>
      <Prose>
        You represent that you have the necessary rights, permissions, licenses,
        and consents to upload and process your content.
      </Prose>
      <Callout>
        <strong className="text-base-content/90 text-[13px]">Important:</strong>{" "}
        This includes obtaining any required consent from people whose voices,
        conversations, images, or personal information are contained in your
        recordings.
      </Callout>
      <Prose>
        Badlit Buddy does not record audio or video through your device. You are
        responsible for complying with applicable laws concerning how your
        recordings were created and obtained.
      </Prose>
      <Prose>
        You should not upload content that you are legally prohibited from
        sending to a third-party processing service.
      </Prose>

      <SectionHeading n={5} id="acceptable-use">
        Acceptable Use
      </SectionHeading>
      <Prose>You agree not to:</Prose>
      <BulletList
        items={[
          "Use Badlit Buddy for illegal purposes.",
          "Upload content you do not have the right or permission to process.",
          "Infringe another person's copyright, privacy, or other rights.",
          "Upload malware or files intended to damage or disrupt systems.",
          "Attempt to hack, disrupt, overload, or interfere with the Service.",
          "Circumvent rate limits, usage limits, credits, or other restrictions.",
          "Create accounts or use automation to abuse free or paid resources.",
          "Reverse engineer or attempt to extract the source code of Badlit Buddy, except where permitted by law.",
          "Resell or redistribute Badlit Buddy without our permission.",
        ]}
      />
      <Prose>
        We may suspend or terminate access if we reasonably believe these Terms
        have been violated.
      </Prose>

      <SectionHeading n={6} id="content-ownership">
        Content Ownership
      </SectionHeading>
      <Callout>
        <strong className="text-base-content/90 text-[13px]">
          Your content belongs to you.
        </strong>
        <p className="mt-1">
          We do not claim ownership of the audio, video, or other content you
          upload. We also do not claim ownership of the transcriptions generated
          for you.
        </p>
      </Callout>
      <Prose>
        You give Badlit Buddy permission to store, copy, transmit, and process
        your content as necessary to provide the Service, including sending
        audio to third-party transcription providers.
      </Prose>
      <Prose>
        We do not sell your uploaded content or claim ownership of it.
      </Prose>
      <Prose>
        You remain responsible for any rights belonging to other people or
        organizations in the content you upload.
      </Prose>

      <SectionHeading n={7} id="ai-and-third-party-processing">
        AI and Third-Party Processing
      </SectionHeading>
      <Prose>
        Badlit Buddy uses third-party services to provide transcription and
        other infrastructure necessary to operate the Service.
      </Prose>
      <Prose>
        Your uploaded audio may be temporarily transmitted to these providers
        for processing. Larger files may be split into smaller portions before
        processing.
      </Prose>
      <Prose>
        The specific providers or technologies used may change over time.
      </Prose>
      <Prose>
        We do not use your uploaded content for our own advertising or
        model-training purposes unless we clearly tell you otherwise.
      </Prose>
      <Prose>
        Because third-party providers are involved, we cannot guarantee that
        every provider will have identical retention periods, processing
        locations, or policies. Our Privacy Policy provides additional
        information about third-party processing.
      </Prose>

      <SectionHeading n={8} id="transcription-accuracy">
        Transcription Accuracy
      </SectionHeading>
      <Prose>
        Badlit Buddy provides{" "}
        <strong>automatically generated transcriptions</strong> and cannot
        guarantee that they will be 100% accurate.
      </Prose>
      <Prose>
        Transcription quality may be affected by audio quality, background
        noise, accents, multiple speakers, pronunciation, language, terminology,
        and other factors.
      </Prose>
      <Prose>
        Transcripts may contain mistakes, missing words, incorrect timestamps,
        or incorrect speaker identification.
      </Prose>
      <Callout>
        <strong className="text-base-content/90 text-[13px]">
          Important Notice:
        </strong>{" "}
        You should review transcripts before relying on them, especially for
        important purposes.
      </Callout>

      <SectionHeading n={9} id="credits-limits-and-payments">
        Credits, Limits, and Payments
      </SectionHeading>
      <Prose>Badlit Buddy may provide free usage as well as paid plans.</Prose>
      <Prose>
        Usage may be measured in transcription minutes, based on the duration of
        your audio or video.
      </Prose>
      <Prose>
        We may impose limits on file duration, transcription minutes, requests,
        or other resources to prevent abuse and manage infrastructure costs.
      </Prose>
      <Prose>
        At the time of these Terms, anonymous users may have a lower
        file-duration limit than signed-in users.
      </Prose>
      <Prose>
        If paid plans are offered, prices and included usage will be shown
        before purchase. Payment may be handled by a third-party payment
        provider or merchant of record.
      </Prose>
      <Prose>
        Failed transcription jobs may be retried and, where appropriate, may not
        consume your available credits.
      </Prose>
      <Prose>
        We may change pricing, credits, limits, or plans in the future.
      </Prose>

      <SectionHeading n={10} id="storage-and-deletion">
        Storage and Deletion
      </SectionHeading>
      <Prose>
        Uploaded audio and video are intended to be <strong>temporary</strong>.
      </Prose>
      <Prose>
        We generally delete source media after transcription or after a failed
        or abandoned job has been cleaned up. Temporary copies may remain for a
        limited period while processing or cleanup is taking place.
      </Prose>
      <Prose>
        Generated transcripts may be stored so that you can access and download
        them.
      </Prose>
      <Prose>
        We intend to provide users with the ability to delete stored transcripts
        and account data.
      </Prose>
      <Callout>
        You should keep your own copies of important source files and
        transcripts. We do not guarantee that deleted or lost data can be
        recovered.
      </Callout>

      <SectionHeading n={11} id="service-availability">
        Service Availability
      </SectionHeading>
      <Prose>
        We aim to keep Badlit Buddy available and reliable, but we do not
        guarantee uninterrupted or error-free service.
      </Prose>
      <Prose>
        The Service may experience downtime, delays, failed jobs, maintenance,
        or outages caused by us, our infrastructure providers, transcription
        providers, or circumstances outside our control.
      </Prose>
      <Prose>
        We are not responsible for losses resulting from your inability to
        access or use the Service, to the maximum extent permitted by applicable
        law.
      </Prose>

      <SectionHeading n={12} id="suspension-and-termination">
        Suspension and Termination
      </SectionHeading>
      <Prose>You may stop using Badlit Buddy at any time.</Prose>
      <Prose>
        We may suspend or terminate your access if you violate these Terms,
        abuse the Service, engage in fraudulent activity, create security or
        operational risks, or use the Service unlawfully.
      </Prose>
      <Prose>
        We may take immediate action when necessary to protect the Service, our
        users, or others.
      </Prose>
      <Callout>
        If your account is terminated, you may lose access to stored transcripts
        and other account data. You should keep independent copies of anything
        important.
      </Callout>

      <SectionHeading n={13} id="privacy">
        Privacy
      </SectionHeading>
      <Prose>
        Your use of Badlit Buddy is also governed by our{" "}
        <strong>Privacy Policy</strong>.
      </Prose>
      <Prose>
        The Privacy Policy explains what information we collect, why we collect
        it, how we use it, how long we retain it, and when information may be
        shared with third-party service providers.
      </Prose>
      <Prose>
        Badlit Buddy does not sell your personal information or uploaded content
        to advertising companies.
      </Prose>
      <Prose>
        Because transcription requires third-party processing, uploaded media
        may be transmitted to the providers necessary to perform the requested
        transcription.
      </Prose>

      <SectionHeading n={14} id="disclaimers-and-limitation-of-liability">
        Disclaimers and Limitation of Liability
      </SectionHeading>
      <Prose>
        Badlit Buddy is provided <strong>&quot;as is&quot;</strong> and{" "}
        <strong>&quot;as available.&quot;</strong>
      </Prose>
      <Prose>
        We do not guarantee that the Service will always be available, secure,
        accurate, or error-free, or that transcription results will meet your
        particular requirements.
      </Prose>
      <Prose>
        To the maximum extent permitted by law, Badlit Buddy and its operator
        will not be liable for indirect, incidental, special, consequential, or
        similar damages arising from your use of the Service.
      </Prose>
      <Callout>
        <strong className="text-base-content/90 text-[13px]">
          Liability Cap:
        </strong>{" "}
        Our total liability for claims relating to the Service will not exceed
        the greater of the amount you paid Badlit Buddy during the 12 months
        before the event giving rise to the claim
      </Callout>
      <Prose>
        Nothing in these Terms limits liability or rights that cannot legally be
        limited or excluded under applicable law.
      </Prose>

      <SectionHeading n={15} id="changes-to-these-terms">
        Changes to These Terms
      </SectionHeading>
      <Prose>We may update these Terms from time to time.</Prose>
      <Prose>
        If we make significant changes, we may notify you through the Service or
        by other reasonable means.
      </Prose>
      <Prose>
        The updated Terms will become effective when posted unless we specify a
        later date.
      </Prose>
      <Prose>
        Your continued use of Badlit Buddy after the updated Terms take effect
        means you accept the revised Terms, to the extent permitted by law.
      </Prose>

      <SectionHeading n={16} id="governing-law-and-contact">
        Governing Law and Contact
      </SectionHeading>
      <Prose>
        These Terms are governed by the laws of the{" "}
        <strong>Republic of the Philippines</strong>, except where mandatory
        laws in your jurisdiction provide otherwise.
      </Prose>
      <Prose>
        If you have a question, concern, or complaint about these Terms or
        Badlit Buddy, please contact us at:
      </Prose>
      <Callout>
        <div className="space-y-1 text-sm">
          <p>
            <strong className="text-base-content/80">Email:</strong>{" "}
            <span className="font-mono text-base-content/60">
              contact@badlitbuddy.me
            </span>
          </p>
          <p>
            <strong className="text-base-content/80">Service:</strong>{" "}
            <span className="font-mono text-base-content/60">
              Badlit Buddy &mdash; badlitbuddy.me
            </span>
          </p>
        </div>
      </Callout>

      <div className="mt-16 pt-8 border-t border-base-300">
        <p className="font-mono text-xs text-base-content/35 tracking-wide">
          Badlit Buddy Terms of Service &mdash; Last updated September 2, 2026
        </p>
      </div>
    </LegalDocumentLayout>
  );
}
