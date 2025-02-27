import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { AppLayout } from "@/components/layout/AppLayout";
import { UserProvider } from "@/providers/UserProviders";
import { WalletProvider } from "@/providers/WalletProvider";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { BlockchainProvider } from "@/providers/BlockchainProvider";
import { JustaNameProvider } from "@/providers/JustaNameProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yodl Kitchen Sink",
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
            <UserProvider>
              <Theme
                accentColor="teal"
                hasBackground={false}
                panelBackground="translucent"
                radius="medium"
                appearance="dark"
              >
                <BlockchainProvider>
                  <AppLayout>{children}</AppLayout>
                </BlockchainProvider>
              </Theme>
            </UserProvider>
          </JustaNameProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
