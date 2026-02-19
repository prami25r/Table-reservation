import * as React from "react";
import Registry from "./registry";
import Providers from "./providers";

export const metadata = {
  title: "RN Web via Next.js",
  description: "Universal app shell",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Registry>
          <Providers>{children}</Providers>
        </Registry>
      </body>
    </html>
  );
}
