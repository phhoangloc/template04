import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import '../style/style.css'
import Provider from "@/redux/component/provider";
const RobotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Locand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={RobotoMono.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
