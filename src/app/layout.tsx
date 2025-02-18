import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { AppLayout } from "@/components/AppLayout";
import { UserProvider } from "@/providers/UserProviders";
import { WalletProvider } from "@/providers/WalletProvider";
import "@radix-ui/themes/styles.css";
import "./globals.css";

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
          <UserProvider>
            <Theme
              accentColor="teal"
              hasBackground={false}
              panelBackground="translucent"
              radius="small"
              appearance="dark"
            >
              <AppLayout>{children}</AppLayout>
            </Theme>
          </UserProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
