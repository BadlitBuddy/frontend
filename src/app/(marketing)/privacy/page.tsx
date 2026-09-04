"use client";

import {
  BulletList,
  Callout,
  LegalDocumentLayout,
  Prose,
  SectionHeading,
  SubHeading,
} from "../_components/LegalDocumentLayout";

const TOC_SECTIONS = [
  { id: "the-short-version", label: "The Short Version" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-your-information", label: "How We Use Your Information" },
  {
    id: "third-party-service-providers",
    label: "Third-Party Service Providers",
  },
  { id: "storage-and-retention", label: "Storage and Retention" },
  { id: "data-security", label: "Data Security" },
  { id: "cookies-and-analytics", label: "Cookies and Analytics" },
  { id: "your-rights", label: "Your Rights" },
  { id: "international-users", label: "International Users" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  {
    id: "legal-requests-and-disclosure",
    label: "Legal Requests and Disclosure",
  },
  {
    id: "data-you-upload-about-other-people",
    label: "Data You Upload About Other People",
  },
  {
    id: "changes-to-this-privacy-policy",
    label: "Changes to This Privacy Policy",
  },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <LegalDocumentLayout
      title="Privacy Policy"
      description="This Privacy Policy explains how Badlit Buddy collects, uses, stores, and protects information when you use our transcription service."
      lastUpdated="September 2, 2026"
      sections={TOC_SECTIONS}
    >
      {/* Section 1: The Short Version */}
      <SectionHeading n={1} id="the-short-version">
        The Short Version
      </SectionHeading>
      <BulletList
        items={[
          "We collect information needed to provide and operate Badlit Buddy.",
          "Uploaded audio and video are temporarily stored while they are being processed.",
          "Your uploaded media may be sent to third-party AI transcription providers to perform transcription.",
          "We do not sell your personal information or uploaded content.",
          "We do not use your uploaded content to train our own AI models.",
          "Generated transcripts may be stored so you can access them later.",
          "You can request deletion of your personal information and stored content, subject to applicable law and technical limitations.",
        ]}
      />

      {/* Section 2: Information We Collect */}
      <SectionHeading n={2} id="information-we-collect">
        Information We Collect
      </SectionHeading>

      <SubHeading>Account Information</SubHeading>
      <Prose>
        If you create a Badlit Buddy account, we may receive information such as
        your:
      </Prose>
      <BulletList
        items={["First and last name", "Email address", "Account identifier"]}
      />
      <Prose>
        If you sign in using Google, we receive the information that Google
        provides to us as part of the authentication process.
      </Prose>
      <Prose>
        You can also use certain parts of Badlit Buddy without creating an
        account.
      </Prose>

      <SubHeading>Uploaded Audio and Video</SubHeading>
      <Prose>
        When you upload a file for transcription, we temporarily store and
        process the file so that we can provide the requested transcription.
      </Prose>
      <Prose>
        Your original file may be converted to another format, such as WAV, in
        your browser before being uploaded for processing.
      </Prose>

      <SubHeading>Transcriptions and Related Data</SubHeading>
      <Prose>
        We store generated transcription files so that they can be returned to
        you and, where applicable, accessed later.
      </Prose>
      <Prose>This may include:</Prose>
      <BulletList
        items={[
          "Transcribed text",
          "Timestamps",
          "Speaker labels",
          "Translation or other generated transcription data",
          "Export files such as TXT, SRT, VTT, or JSON",
          "Information necessary to associate the transcription with your account or transcription job",
        ]}
      />

      <SubHeading>Technical and Usage Information</SubHeading>
      <Prose>
        We may collect limited technical information needed to operate, secure,
        and troubleshoot the Service.
      </Prose>
      <Prose>This may include information such as:</Prose>
      <BulletList
        items={[
          "IP address",
          "Approximate location derived from IP address",
          "Browser and device information",
          "Requests and actions necessary for operating the Service",
          "Error and diagnostic logs",
          "Account or job identifiers",
        ]}
      />
      <Prose>
        We may also use privacy-conscious analytics to understand how the
        Service is being used, such as which pages or features are used.
      </Prose>
      <Prose>
        We do not intentionally include the contents of your audio files or
        transcripts in analytics data.
      </Prose>

      {/* Section 3: How We Use Your Information */}
      <SectionHeading n={3} id="how-we-use-your-information">
        How We Use Your Information
      </SectionHeading>
      <Prose>We use information we collect to:</Prose>

      <Prose>
        <strong>Provide the Service</strong>
        <br />
        Process your uploads, generate transcriptions, store transcripts, and
        return results to you.
      </Prose>
      <Prose>
        <strong>Manage accounts</strong>
        <br />
        Authenticate users and maintain account information.
      </Prose>
      <Prose>
        <strong>Operate and secure Badlit Buddy</strong>
        <br />
        Prevent abuse, enforce usage limits, troubleshoot problems, detect
        security issues, and maintain our infrastructure.
      </Prose>
      <Prose>
        <strong>Improve the Service</strong>
        <br />
        Understand how users interact with Badlit Buddy, identify problems, and
        improve features and usability.
      </Prose>
      <Prose>
        We do not use your uploaded audio, video, or transcripts for our own
        advertising or for training our own AI models.
      </Prose>
      <Prose>
        <strong>Communicate with you</strong>
        <br />
        We may contact you about your account, important Service changes,
        security issues, or other necessary operational matters.
      </Prose>
      <Prose>
        <strong>Comply with the law</strong>
        <br />
        We may process or disclose information when required by applicable law
        or valid legal process.
      </Prose>

      {/* Section 4: Third-Party Service Providers */}
      <SectionHeading n={4} id="third-party-service-providers">
        Third-Party Service Providers
      </SectionHeading>
      <Prose>
        Badlit Buddy relies on third-party providers to operate the Service.
      </Prose>
      <Prose>These may include providers for:</Prose>
      <BulletList
        items={[
          "Cloud infrastructure and storage",
          "AI transcription",
          "Authentication",
          "Database hosting",
          "Analytics",
          "Payment processing, if paid plans are offered",
        ]}
      />
      <Prose>
        When you request a transcription, your uploaded audio may be transmitted
        to the applicable transcription provider so that the provider can
        process the audio and return the transcription.
      </Prose>
      <Prose>
        We only provide third parties with information reasonably necessary for
        the services they provide.
      </Prose>
      <Prose>
        Third-party providers have their own privacy policies and data-handling
        practices. Their retention periods, processing locations, and other
        practices may differ.
      </Prose>
      <Prose>
        We do not sell your personal information or uploaded content to
        third-party advertising companies.
      </Prose>

      {/* Section 5: Storage and Retention */}
      <SectionHeading n={5} id="storage-and-retention">
        Storage and Retention
      </SectionHeading>

      <SubHeading>Uploaded Media</SubHeading>
      <Prose>Uploaded audio and video are intended to be temporary.</Prose>
      <Prose>
        We generally delete source media after the transcription job has
        completed or after a failed, abandoned, or stuck job has been cleaned
        up.
      </Prose>
      <Prose>
        Because cleanup is performed by automated systems, deletion may not
        always occur immediately.
      </Prose>

      <SubHeading>Transcripts</SubHeading>
      <Prose>
        Generated transcripts may be stored in our cloud storage so that you can
        access and download them.
      </Prose>
      <Prose>
        We intend to provide users with the ability to delete stored transcripts
        and other associated content.
      </Prose>

      <SubHeading>Account Information</SubHeading>
      <Prose>
        If you create an account, we retain your account information while your
        account remains active or for as long as reasonably necessary to provide
        the Service.
      </Prose>
      <Prose>
        You may request deletion of your account and associated personal
        information.
      </Prose>

      <SubHeading>Logs and Technical Information</SubHeading>
      <Prose>
        Some technical and security logs may be retained for as long as
        reasonably necessary for security, troubleshooting, fraud prevention,
        and legal purposes.
      </Prose>
      <Prose>
        We do not intentionally store audio or transcript content in ordinary
        application logs.
      </Prose>

      {/* Section 6: Data Security */}
      <SectionHeading n={6} id="data-security">
        Data Security
      </SectionHeading>
      <Prose>
        We take reasonable technical and organizational measures to protect
        information handled by Badlit Buddy.
      </Prose>
      <Prose>
        These measures may include access controls, authenticated access, secure
        connections, restricted server access, and temporary processing and
        deletion of uploaded media.
      </Prose>
      <Prose>However, no online service can guarantee absolute security.</Prose>
      <Callout>
        You should not upload information to Badlit Buddy unless you are
        comfortable having it processed through an online service and, where
        necessary, transmitted to our third-party transcription providers.
      </Callout>

      {/* Section 7: Cookies and Analytics */}
      <SectionHeading n={7} id="cookies-and-analytics">
        Cookies and Analytics
      </SectionHeading>
      <Prose>
        Badlit Buddy may use cookies or similar browser technologies for
        purposes such as authentication and analytics.
      </Prose>
      <Prose>
        Authentication-related cookies may be necessary for the Service to
        function.
      </Prose>
      <Prose>
        We may use self-hosted, privacy-conscious analytics to understand how
        people use Badlit Buddy and which features are useful.
      </Prose>
      <Prose>
        We do not use advertising trackers such as Meta Pixel, TikTok Pixel, or
        Google advertising trackers.
      </Prose>

      {/* Section 8: Your Rights */}
      <SectionHeading n={8} id="your-rights">
        Your Rights
      </SectionHeading>
      <Prose>
        Depending on where you live and applicable law, you may have rights
        regarding your personal information.
      </Prose>
      <Prose>These may include the right to:</Prose>
      <BulletList
        items={[
          "Access your personal information",
          "Request correction of inaccurate information",
          "Request deletion or erasure",
          "Request a copy or export of your information",
          "Object to certain processing",
          "Request restriction of certain processing",
          "Withdraw consent where processing is based on consent",
          "Lodge a complaint with the appropriate privacy or data-protection authority",
        ]}
      />
      <Prose>
        You may also be able to delete transcripts or other content directly
        through the Service when the relevant functionality is available.
      </Prose>
      <Prose>
        To exercise a privacy right or ask a privacy-related question, contact
        us using the information at the end of this policy.
      </Prose>
      <Prose>
        We may need to verify your identity before completing certain requests.
      </Prose>

      {/* Section 9: International Users */}
      <SectionHeading n={9} id="international-users">
        International Users
      </SectionHeading>
      <Prose>Badlit Buddy is available worldwide.</Prose>
      <Prose>
        If you use Badlit Buddy from outside the Philippines, your information
        may be processed in countries other than the country where you live.
      </Prose>
      <Prose>
        The locations in which information is processed may depend on the
        infrastructure and third-party providers used to operate the Service.
      </Prose>
      <Prose>
        Where applicable, we will take reasonable steps required by applicable
        data-protection laws when transferring personal information
        internationally.
      </Prose>

      {/* Section 10: Children's Privacy */}
      <SectionHeading n={10} id="childrens-privacy">
        Children&apos;s Privacy
      </SectionHeading>
      <Prose>
        Badlit Buddy is intended for people{" "}
        <strong>13 years of age or older</strong>.
      </Prose>
      <Prose>
        We do not knowingly provide an account to children under 13.
      </Prose>
      <Callout>
        <strong className="text-base-content/90 text-[13px]">Important:</strong>{" "}
        If you believe that a child under 13 has provided personal information
        to Badlit Buddy, please contact us so that we can investigate and take
        appropriate action.
      </Callout>
      <Prose>
        If an uploaded recording contains a child&apos;s voice or personal
        information, the person uploading the recording is responsible for
        ensuring that they have the necessary legal authority and consent to
        upload and process it.
      </Prose>

      {/* Section 11: Legal Requests and Disclosure */}
      <SectionHeading n={11} id="legal-requests-and-disclosure">
        Legal Requests and Disclosure
      </SectionHeading>
      <Prose>We may disclose information when reasonably necessary to:</Prose>
      <BulletList
        items={[
          "Comply with applicable law",
          "Respond to valid legal process or government requests",
          "Protect the security or integrity of Badlit Buddy",
          "Prevent fraud, abuse, or unauthorized access",
          "Protect the rights, safety, or property of Badlit Buddy, our users, or others",
        ]}
      />
      <Prose>
        We do not provide information to law enforcement simply because it is
        requested informally. Requests will be handled according to applicable
        law.
      </Prose>

      {/* Section 12: Data You Upload About Other People */}
      <SectionHeading n={12} id="data-you-upload-about-other-people">
        Data You Upload About Other People
      </SectionHeading>
      <Prose>Your recordings may contain information about other people.</Prose>
      <Prose>
        You are responsible for ensuring that you have the necessary rights,
        permissions, and legal basis to upload and process recordings containing
        other people&apos;s voices, conversations, or personal information.
      </Prose>
      <Prose>
        Badlit Buddy does not determine whether your recording was legally
        obtained or whether you have obtained the appropriate consent.
      </Prose>

      {/* Section 13: Changes to This Privacy Policy */}
      <SectionHeading n={13} id="changes-to-this-privacy-policy">
        Changes to This Privacy Policy
      </SectionHeading>
      <Prose>We may update this Privacy Policy from time to time.</Prose>
      <Prose>
        If we make significant changes, we may notify you through the Service or
        by other reasonable means.
      </Prose>
      <Prose>
        The updated policy will become effective when posted unless we specify a
        later date.
      </Prose>
      <Prose>
        Your continued use of Badlit Buddy after the updated policy becomes
        effective means you acknowledge the updated policy, to the extent
        permitted by law.
      </Prose>

      {/* Section 14: Contact Us */}
      <SectionHeading n={14} id="contact-us">
        Contact Us
      </SectionHeading>
      <Prose>
        If you have questions about this Privacy Policy, want to exercise a
        privacy right, or have a privacy-related concern, contact us at:
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
          Badlit Buddy Privacy Policy &mdash; Last updated September 2, 2026
        </p>
      </div>
    </LegalDocumentLayout>
  );
}
