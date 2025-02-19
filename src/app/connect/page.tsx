"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Flex, SegmentedControl } from "@radix-ui/themes";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { useState } from "react";
import { TbHttpGet, TbHttpPost } from "react-icons/tb";
import { ReadBlockchain } from "../components/ReadBlockchain";
import { WriteBlockchain } from "../components/WriteBlockchain";

const CONNECT_SECTIONS = {
  read: {
    title: "Read Data",
    icon: TbHttpGet,
    component: <ReadBlockchain />,
  },
  write: {
    title: "Send Transactions",
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
