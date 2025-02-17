"use client";

import { PageHeader } from "@/components/PageHeader";
import { Flex, SegmentedControl } from "@radix-ui/themes";
import { ApiPlayground } from "./components/ApiPlayground";
import { Leaderboard } from "./components/Leaderboard";
import { FaTrophy, FaChartLine } from "react-icons/fa";
import { StickyTopBox } from "@/components/StickyPageHeader";
import { useState } from "react";

const INDEXER_SECTIONS = {
  playground: {
    title: "API Playground",
    // description: "Fetch indexed payments",
    icon: FaChartLine,
    component: <ApiPlayground />,
  },
  leaderboard: {
    title: "Leaderboard",
    // description: "View and create leaderboards",
    icon: FaTrophy,
    component: <Leaderboard />,
  },
} as const;

type IndexerSection = keyof typeof INDEXER_SECTIONS;

export default function IndexerPage() {
  const [currentView, setCurrentView] = useState<IndexerSection>("playground");

  return (
    <>
      <StickyTopBox>
        <Flex direction="column" justify="between" align="center" gap="2">
          <PageHeader title="Indexer" backPath="/" />
          <SegmentedControl.Root
            size="1"
            value={currentView}
            onValueChange={(value: IndexerSection) => setCurrentView(value)}
            className="w-full"
          >
            {Object.entries(INDEXER_SECTIONS).map(([key, section]) => (
              <SegmentedControl.Item key={key} value={key}>
                <Flex align="center" gap="2">
                  <section.icon />
                  {section.title}
                </Flex>
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.Root>
        </Flex>
      </StickyTopBox>
      {INDEXER_SECTIONS[currentView].component}
    </>
  );
}
