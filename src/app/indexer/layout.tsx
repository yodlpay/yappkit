import { PlaygroundProvider } from "../../providers/PlaygroundProvider";

export default function IndexerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PlaygroundProvider>{children}</PlaygroundProvider>;
}
