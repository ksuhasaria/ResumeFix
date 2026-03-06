import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: "ResumeFix | Land Your Dream Job in the US",
  description: "Fix your resume with AI-powered ATS optimization, professional rewriting, and interview prep for the competitive US tech market.",
  keywords: "resume fix, ATS optimization, resume rewrite, interview prep, US tech jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
