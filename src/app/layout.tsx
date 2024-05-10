import type { Metadata } from "next";
import { Roboto_Mono, Ubuntu, Ubuntu_Condensed, Ubuntu_Mono } from "next/font/google";
import "../style/global.css"
import Provider from "@/redux/component/provider";
const font = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Locpham",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
