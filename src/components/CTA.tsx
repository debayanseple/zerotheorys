import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-radial)" }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="glass rounded-3xl p-10 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Start a build</p>
              <h2 className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                Replace three vendors with <span className="text-gradient">one accountable partner</span>.
              </h2>
              <p className="mt-6 text-muted-foreground max-w-lg">
                Tell us what you're shipping. We'll come back with a scoped plan, a timeline, and the team that will
                deliver it.
              </p>
              <a
                href="mailto:hello.zerotheorys@gmail.com"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 bg-foreground text-background font-medium hover:opacity-90 transition"
              >
                hello.zerotheorys@gmail.com →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Mail, label: "Email", value: "hello.zerotheorys@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 79808 07674" },
                { icon: MapPin, label: "Studio", value: "10B Bright Street, Kolkata 700019, India" },
                { icon: Clock, label: "Hours", value: "Mon–Sat · 09:00–19:00 IST" },
              ].map((c) => (
                <div key={c.label} className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <c.icon className="size-4" strokeWidth={1.5} />
                    <span className="text-[10px] tracking-widest uppercase">{c.label}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <footer className="mt-24 max-w-6xl mx-auto">
        <div className="glass rounded-3xl px-8 py-6 flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple" />© 2026 Zero Theorys
            Pvt. Ltd.
          </div>
          <div className="text-xs">Follow-the-sun support · Kolkata · London · NYC</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">
              Twitter
            </a>
            <a href="#" className="hover:text-foreground transition">
              Instagram
            </a>
            <a href="#" className="hover:text-foreground transition">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
