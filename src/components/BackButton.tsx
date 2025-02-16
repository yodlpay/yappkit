import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function BackButton({ path }: { path: string }) {
  return (
    <Link href={path}>
      <ChevronLeftIcon width={18} height={18} />
    </Link>
  );
}
