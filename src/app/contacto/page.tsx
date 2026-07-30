import type { Metadata } from "next";
import { ContactoClient } from "@/components/site/contacto-client";

export const metadata: Metadata = {
  title: "Contacto — Corevia MKT",
  description:
    "¿Tienes un proyecto en mente? Escríbenos y recibe una propuesta personalizada para impulsar tu marca.",
};

export default function ContactoPage() {
  return <ContactoClient />;
}