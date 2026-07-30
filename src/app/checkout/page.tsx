import type { Metadata } from "next";
import { CheckoutClient } from "@/components/site/checkout-client";

export const metadata: Metadata = {
  title: "Checkout — Corevia MKT",
  description: "Completa la contratación de tu solución digital.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}