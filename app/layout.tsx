import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Analytics } from "@vercel/analytics/next";
import { FilesProvider } from "@/lib/files-context";
import { FileItem } from "@/lib/cache";
import { Header } from "@/components/header";
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
  title: "Epstein Files Browser",
  description: "Browse and view the released Epstein files",
};

const WORKER_URL = "https://epstein-files.rhys-669.workers.dev";

interface AllFilesResponse {
  files: FileItem[];
  totalReturned: number;
}

async function fetchAllFiles(): Promise<FileItem[]> {
  const response = await fetch(`${WORKER_URL}/api/all-files`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }

  const data: AllFilesResponse = await response.json();
  return data.files;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const files = await fetchAllFiles();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FilesProvider files={files}>
          <Header />
          <NuqsAdapter>{children}</NuqsAdapter>
        </FilesProvider>
        <Analytics />
      </body>
    </html>
  );
}
