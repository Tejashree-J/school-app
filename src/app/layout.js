import "./globals.css";
import Navbar from "../Components/Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata = {
  title: "School App",
  description: "School Management Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
