import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/hanken-grotesk/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";

export const metadata: Metadata = {
  title: "Corevia MKT — Diseño digital · Desarrollo web a la medida",
  description:
    "Creamos páginas web, tiendas en línea y plataformas a la medida para emprendedores y empresas. Diseño profesional, entrega 100% en línea desde CDMX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}