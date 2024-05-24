import type { Metadata } from "next";
import { Roboto_Mono, Ubuntu, Ubuntu_Condensed, Ubuntu_Mono } from "next/font/google";
import "../style/global.css"
import Provider from "@/redux/component/provider";
const font = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "Locpham | %s", default: "Locpham" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + " scrollbar-none min-height-100vh"}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
