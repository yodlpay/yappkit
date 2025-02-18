"use client";

import { PageHeader } from "@/components/PageHeader";
import { Flex, SegmentedControl } from "@radix-ui/themes";
import { StickyTopBox } from "@/components/StickyPageHeader";
import { useState } from "react";
import { TbHttpGet, TbHttpPost } from "react-icons/tb";
import { ReadBlockchain } from "../components/ReadBlockchain";
import { WriteBlockchain } from "../components/WriteBlockchain";

const CONNECT_SECTIONS = {
  read: {
    title: "Blockchain Data",
    icon: TbHttpGet,
    component: <ReadBlockchain />,
  },
  write: {
    title: "Blockchain Transactions",
    icon: TbHttpPost,
    component: <WriteBlockchain />,
  },
} as const;

type ConnectSection = keyof typeof CONNECT_SECTIONS;

export default function ConnectPage() {
  const [currentView, setCurrentView] = useState<ConnectSection>("read");

  return (
    <>
      <StickyTopBox>
        <Flex direction="column" justify="between" align="center" gap="2">
          <PageHeader title="Connect" backPath="/" />
          <SegmentedControl.Root
            size="1"
            value={currentView}
            onValueChange={(value: ConnectSection) => setCurrentView(value)}
            className="w-full"
          >
            {Object.entries(CONNECT_SECTIONS).map(([key, section]) => (
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
      {CONNECT_SECTIONS[currentView].component}
    </>
  );
}
