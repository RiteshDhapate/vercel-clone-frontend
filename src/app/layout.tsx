import type { Metadata } from "next";
import "./globals.css";
import { FloatingNavJSX } from "@/components/custom/Nav";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/socket/socket";


export const metadata: Metadata = {
  title: "SwiftDeploy",
  description:
    "SwiftDeploy offers cloud deployment solutions for Next.js, React.js, Vite, and more. Fast, reliable, and secure deployment alternatives to Vercel.",
  keywords:
    "cloud deployment, Next.js deployment, React.js hosting, Vite deployment, SwiftDeploy, web development, cloud computing, deployment platform",
  authors: [{name:"ritesh dhapate",url:"https://ritesh.live"}],
  openGraph: {
    title: "SwiftDeploy",
    description:
      "SwiftDeploy: A cloud deployment alternative to Vercel for Next.js applications.",
    url: "https://swiftdeploy.ritesh.live",
    siteName: "SwiftDeploy",
    images: [
      {
        url: "/og-image.png", // Open Graph image
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftDeploy",
    description:
      "SwiftDeploy: A cloud deployment alternative to Vercel for Next.js applications.",
    images: [
      "/twitter-image.png", // Twitter card image
    ],
  },
  robots: {
    index: true,
    follow: true,
  },

  applicationName: "SwiftDeploy",
  publisher: "SwiftDeploy Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#1C1C1C] w-screen">
        <SocketProvider>
          <Toaster />
          <NextTopLoader color="#fff" />
          <FloatingNavJSX />
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
