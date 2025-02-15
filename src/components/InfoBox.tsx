"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { ReactNode } from "react";

type InfoBoxProps = {
  children: ReactNode;
  icon?: ReactNode;
};

export function InfoBox({ children, icon = <InfoCircledIcon /> }: InfoBoxProps) {
  return (
    <Callout.Root size='1'>
      <Callout.Icon>{icon}</Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
}
