import { Box } from "@radix-ui/themes";

export function StickyTopBox({ children }: { children: React.ReactNode }) {
  return (
    // <Box className="sticky top-16 z-10 pb-2" style={{ backgroundColor: "var(--gray-1)" }}>
    <Box className="sticky top-16 z-10 py-2" >
      {children}
    </Box>
  );
}
