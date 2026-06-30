import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const certs = ["SOC 2 Type II", "ISO 27001:2022", "GDPR", "HIPAA", "PCI DSS"];
const residency = ["EU", "US", "IN"];
const stack = [
  "AWS", "Google Cloud", "Azure", "OpenAI", "Anthropic",
  "Snowflake", "Salesforce", "Vercel", "Cloudflare", "Postgres",
];

export default function Security() {
  return (
    <section id="security" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-10"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl glass flex items-center justify-center">
              <ShieldCheck className="size-5" strokeWidth={1.5} />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Procurement-ready
            </p>
          </div>
          <h2 className="mt-6 font-display text-3xl md:text-5xl font-semibold tracking-tight">
            Security from <span className="text-gradient">day one</span>.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Certifications, compliance, and data residency controls baked into
            every engagement — not bolted on at audit time.
          </p>

          <div className="mt-8">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Certifications & Compliance
            </p>
            <div className="flex flex-wrap gap-2">
              {certs.map((c) => (
                <span key={c} className="glass rounded-full px-4 py-1.5 text-xs">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Data Residency
            </p>
            <div className="flex flex-wrap gap-2">
              {residency.map((r) => (
                <span key={r} className="glass rounded-full px-4 py-1.5 text-xs">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-10"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Technology
          </p>
          <h2 className="mt-6 font-display text-3xl md:text-5xl font-semibold tracking-tight">
            Vendor-neutral by <span className="text-gradient">design</span>.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We pick the right tool for the outcome — not the contract. Senior
            engineers across cloud, data, and model platforms.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span key={s} className="glass rounded-full px-4 py-1.5 text-xs">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
