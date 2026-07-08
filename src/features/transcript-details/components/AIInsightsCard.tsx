"use client";

import { Text, UnstyledButton } from "@mantine/core";
import classes from "../styles/TranscriptDetail.module.css";

export default function AIInsightsCard() {
  return (
    <div className={classes.sidebarCard}>
      <div className={classes.sidebarCardHeader}>
        <Text fz="0.65rem" fw={700} c="slate.4" tt="uppercase" lts="0.08em">
          AI Key Insights
        </Text>
        <UnstyledButton className={classes.generateInsightsButton}>
          Generate
        </UnstyledButton>
      </div>
      <div className={classes.sidebarCardBody}>
        <div className={classes.insightsSkeleton}>
          <div className={classes.skeletonLine} style={{ width: "100%" }} />
          <div className={classes.skeletonLine} style={{ width: "85%" }} />
          <div className={classes.skeletonLine} style={{ width: "70%" }} />
        </div>
      </div>
    </div>
  );
}
