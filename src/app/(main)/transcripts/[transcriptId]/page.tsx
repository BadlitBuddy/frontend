"use client";

import { Box, Stack, TextInput } from "@mantine/core";
import { SearchIcon } from "lucide-react";
import classes from "@/features/transcript-details/styles/TranscriptDetail.module.css";
import ActionBar from "@/features/transcript-details/components/ActionBar";
import { AudioControls } from "@/features/transcript-details/components/AudioControls";
import { TranscriptDetails } from "@/features/transcript-details/types";
import TranscriptSegment from "@/features/transcript-details/components/TranscriptSegment";
import TranscriptMetadata from "@/features/transcript-details/components/TranscriptMetadata";
import AIInsightsCard from "@/features/transcript-details/components/AIInsightsCard";

// TODO: Mock data for now, replace with actuals
const TRANSCRIPT_DETAIL: TranscriptDetails = {
  id: "1",
  fileName: "Weekly_Product_Sync_23_Oct.mp3",
  fileType: "MPEG-4 Audio (m4a)",
  uploadedBy: "Chen, Sarah (Product Lead)",
  permissions: "Restricted · Product-Team-Full",
  duration: "42:15",
  currentTime: "14:45",
  segments: [
    {
      id: "s1",
      speaker: "Sarah Chen",
      time: "00:00",
      active: false,
      text: "Good morning everyone. Thanks for joining today's product sync. We have a fairly tight agenda, so I'd like to dive straight into the Q4 roadmap adjustments. Marcus, could you give us the quick highlight on the API integration status before we look at the UI mocks?",
    },
    {
      id: "s2",
      speaker: "Marcus Thorne",
      time: "14:45",
      active: true,
      highlight: { start: 83, end: 118 },
      text: "Sure thing, Sarah. The engineering team has successfully completed the core migration for the auth service. We're currently seeing about a 15% reduction in latency across the board. The main hurdle right now is the legacy webhook system, which is proving to be a bit more stubborn than we anticipated in the initial sprint planning.",
    },
    {
      id: "s3",
      speaker: "Elena Rodriguez",
      time: "16:12",
      active: false,
      text: "If we're looking at the webhooks, I think we should consider the batching proposal we discussed last Tuesday. If we don't resolve the throughput issue before the Black Friday peak, we're going to see some major drop-offs in customer reporting. I've uploaded some initial stress test results to the Project Alpha folder for everyone to review later.",
    },
    {
      id: "s4",
      speaker: "Sarah Chen",
      time: "18:40",
      active: false,
      text: "That's a valid point, Elena. Let's schedule a deep dive for Thursday specifically for the webhook architecture. Marcus, invite the DevOps leads as well. Moving on to the design side, I've seen the new dark mode tokens. They look incredibly clean, but I want to make sure we're not sacrificing accessibility for aesthetics.",
    },
    {
      id: "s5",
      speaker: "Marcus Thorne",
      time: "22:05",
      active: false,
      text: "Agreed. We've run the contrast checkers and we're hitting triple-A standards on all core functional elements. The \"Invisible UI\" approach is really helping users focus on the content—which in this case, is the actual data output. We're seeing better focus session durations in the early beta cohort.",
    },
    {
      id: "s6",
      speaker: "Elena Rodriguez",
      time: "26:30",
      active: false,
      text: "That contrast validation is a relief. Switching gears slightly—have we finalized the marketing copy for the beta rollout announcement next month? The growth team was asking if they should focus heavily on the performance lift or lead with the UI redesign.",
    },
    {
      id: "s7",
      speaker: "Sarah Chen",
      time: "30:15",
      active: false,
      text: "I think we lead with a 50/50 split, but prioritize the performance lift for existing power users. They've been shouting about latency for quarters now. Let's make sure we sync with the Product Marketing Manager by Friday to lock in those content pillars.",
    },
    {
      id: "s8",
      speaker: "Marcus Thorne",
      time: "34:50",
      active: false,
      text: "Sounds like a plan. On the infrastructure side, I also wanted to flag that we need to budget some time for dependencies updates next sprint. Some of our core telemetry libraries are deprecated, and I don't want us falling behind on security compliance right before the audit.",
    },
    {
      id: "s9",
      speaker: "Sarah Chen",
      time: "38:20",
      active: false,
      text: "Good catch, Marcus. Go ahead and bake those security updates into the upcoming sprint velocity. We can't risk failing that compliance audit. Elena, do you have any final QA blocks or blockers we need to address before we sign off today?",
    },
    {
      id: "s10",
      speaker: "Elena Rodriguez",
      time: "40:05",
      active: false,
      text: "Nothing critical on my end. As long as we get that webhook deep dive scheduled for Thursday, the QA team can map out the testing scenarios for the Friday regression run. I'll make sure the test cases are ready to review by tomorrow EOD.",
    },
  ],
};

export default function TranscriptDetailPage() {
  const transcript = TRANSCRIPT_DETAIL;

  return (
    <Stack gap={0}>
      <ActionBar fileName={transcript.fileName} />
      <AudioControls src="/audio/kennedy44100_converted-test-1.wav" />

      <Box pt="xl">
        <div className={classes.layout}>
          {/* // TODO: Implement search functionality */}
          <Stack gap={0}>
            <TextInput
              placeholder="Search in transcript…"
              leftSection={
                <SearchIcon size={14} color="var(--mantine-color-slate-4)" />
              }
              size="sm"
              mb="md"
              styles={{
                input: {
                  borderColor: "var(--mantine-color-slate-2)",
                  backgroundColor: "#ffffff",
                  color: "var(--mantine-color-slate-8)",
                  "&::placeholder": {
                    color: "var(--mantine-color-slate-4)",
                  },
                },
              }}
            />

            <Stack gap={0}>
              {transcript.segments.map((segment) => (
                <TranscriptSegment key={segment.id} segment={segment} />
              ))}
            </Stack>
          </Stack>

          <Stack gap="md">
            <TranscriptMetadata
              fileType={transcript.fileType}
              uploadedBy={transcript.uploadedBy}
              permissions={transcript.permissions}
            />
            <AIInsightsCard />
          </Stack>
        </div>
      </Box>
    </Stack>
  );
}
