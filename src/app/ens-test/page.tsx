"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { EnsStuff } from "./EnsStuff";
import { Section, Heading } from "@radix-ui/themes";

export default function EnsTest() {
  return (
    <>
      <StickyTopBox>
        <PageHeader title="ENS Test" backPath="/" />
      </StickyTopBox>
      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Intro
        </Heading>
      </Section>
      <EnsStuff />
    </>
  );
}
