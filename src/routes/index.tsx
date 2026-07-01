import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import Security from "@/components/Security";
import CTA from "@/components/CTA";
import HangingPendant from "@/components/HangingPendant";
import ScrollFX from "@/components/ScrollFX";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zero Theorys — One accountable partner for AI, engineering & growth" },
      { name: "description", content: "Zero Theorys integrates AI, software engineering, performance marketing and 24/7 operations into a single accountable team for ambitious companies." },
      { property: "og:title", content: "Zero Theorys — One accountable partner" },
      { property: "og:description", content: "AI, software, websites, marketing and BPO — delivered by one senior team." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <HangingPendant />

      <Hero />
      <Services />
      <Process />
      <CaseStudies />
      <Manifesto />
      <Stats />
      <Security />
      <CTA />
    </main>
  );
}
