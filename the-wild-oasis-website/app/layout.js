import Header from "@/app/_components/Header";

import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
  //weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
});

export const metadata = {
  title: {
    template: "%s The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurioous cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
