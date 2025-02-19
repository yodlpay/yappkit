import { Box } from "@radix-ui/themes";

export function StickyTopBox({ children }: { children: React.ReactNode }) {
  return (
    <Box py="2" className="sticky top-12 z-10" style={{ backgroundColor: "var(--gray-1)" }}>
      {children}
    </Box>
  );
}
