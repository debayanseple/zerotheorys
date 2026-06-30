import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zero Theorys — Engineering the improbable" },
      { name: "description", content: "Zero Theorys is a creative engineering studio crafting software, web, brand and growth systems for ambitious teams." },
      { property: "og:title", content: "Zero Theorys — Engineering the improbable" },
      { property: "og:description", content: "Software, web, social and graphic design for ambitious teams." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Manifesto />
      <Stats />
      <CTA />
    </main>
  );
}
