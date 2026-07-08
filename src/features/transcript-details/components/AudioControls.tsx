"use client";

import { Box } from "@mantine/core";
import { Audio } from "@gfazioli/mantine-audio";

// TODO: implement actual audiot controls
export function AudioControls({
  src = "/audio/kennedy44100_converted-test-1.wav",
}: {
  src: string;
}) {
  return (
    <Box
      pos="sticky"
      top={0}
      style={{
        marginLeft: "calc(var(--mantine-spacing-xl) * -1)",
        marginRight: "calc(var(--mantine-spacing-xl) * -1)",
        zIndex: 10,
      }}
    >
      <Audio
        color="slate.9"
        radius={0}
        src={src}
        styles={{
          playButton: { borderRadius: "4px" },
        }}
      >
        <Audio.Waveform height={32} />
        <Audio.Controls>
          <Audio.PlayButton />
          <Audio.Timeline />
          <Audio.SkipButton seconds={-10} />
          <Audio.TimeDisplay />
          <Audio.SkipButton seconds={10} />
          <Audio.MuteButton />
          <Audio.VolumeSlider />
          <Audio.SpeedControl />
        </Audio.Controls>
      </Audio>
    </Box>
  );
}
