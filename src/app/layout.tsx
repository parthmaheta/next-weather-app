"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import {ReactQueryProvider} from "./_utils/Provider";
import { Header } from "./_components/Headers";
import SearchCity from "./(routes)/SearchCity";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " text-primary-dark dark:text-primary-light dark:bg-primary-dark dark:bg-opacity-90"
        }
      >
        <ReactQueryProvider>
          <Header />
          <SearchCity/>
          <div className="container mt-[22vh] sm:mt-[16vh] bg-primary dark:bg-primary-dark">
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

