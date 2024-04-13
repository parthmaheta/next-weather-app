import { Inter } from "next/font/google";
import "./globals.css";
import {ReactQueryProvider} from "./_utils/Provider";
import { Header } from "./_components/Headers";
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
          <div className="container mt-[20vh] sm:mt-[14vh] bg-primary dark:bg-primary-dark">
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

