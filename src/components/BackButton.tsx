"use client";

import { IconButton } from "@radix-ui/themes";
import { FaAngleLeft, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function BackButton({ path }: { path: string }) {
  //   const router = useRouter();

  return (
    <Link href={path}>
      <ChevronLeftIcon width={18} height={18} />
    </Link>
    // <IconButton variant='ghost' onClick={() => router.back()}>
    //   <ChevronLeftIcon />
    // </IconButton>
  );
}
