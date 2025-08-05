import type { Metadata } from "next";
import { NavBar, SideBar } from "../../layouts/page";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AQARAT HUB",
  description: "Your Real Estate Hub in the UAE",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          richColors
          className="toaster"
          position="top-center"
          offset={5}
        />
        <NavBar />
        <div className="flex">
          <SideBar />
          <div className="w-full mx-auto relative pt-20 px-5">{children}</div>
        </div>
      </body>
    </html>
  );
}
