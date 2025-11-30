"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { RealtimeProvider } from "@/lib/RealtimeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <RealtimeProvider>
            {children}
          </RealtimeProvider>
        </Provider>
      </body>
    </html>
  );
}