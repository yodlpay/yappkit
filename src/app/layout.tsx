import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { AppLayout } from "@/components/layout/AppLayout";
import { WalletProvider } from "@/providers/WalletProvider";
import { JustaNameProvider } from "@/providers/JustaNameProvider";
import { ACCENT_COLOR } from "@/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YappKit",
  description: "Demo application showcasing Yodl mini-app capabilities",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WalletProvider>
          <JustaNameProvider>
            <Theme
              accentColor={ACCENT_COLOR}
              hasBackground={false}
              panelBackground="translucent"
              radius="medium"
              appearance="dark"
            >
              <AppLayout>{children}</AppLayout>
            </Theme>
          </JustaNameProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
