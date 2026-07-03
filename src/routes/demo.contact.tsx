import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/demo/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Northwind" },
      { name: "description", content: "Get in touch with sales, support, or partnerships." },
      { property: "og:title", content: "Contact — Northwind" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <Badge variant="secondary">Contact</Badge>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">Talk to our team.</h1>
        <p className="mt-3 text-muted-foreground">We typically reply within 4 business hours.</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { i: Mail, t: "Email", v: "hello@northwind.example" },
            { i: MessageCircle, t: "Live chat", v: "Mon–Fri · 9am–7pm CET" },
            { i: Phone, t: "Phone", v: "+1 (415) 555-0142" },
          ].map(({ i: Icon, t, v }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground grid place-items-center"><Icon className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">{t}</div>
                <div className="text-sm text-muted-foreground">{v}</div>
              </div>
            </div>
          ))}
        </div>

        <form className="rounded-xl border border-border bg-card p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label htmlFor="c-name">Full name</Label><Input id="c-name" required /></div>
            <div><Label htmlFor="c-email">Email</Label><Input id="c-email" type="email" required /></div>
          </div>
          <div><Label htmlFor="c-company">Company</Label><Input id="c-company" /></div>
          <div><Label htmlFor="c-msg">How can we help?</Label><Textarea id="c-msg" rows={5} required /></div>
          <Button type="submit" className="w-full">Send message</Button>
          <p className="text-xs text-muted-foreground text-center">By submitting you agree to our privacy policy.</p>
        </form>
      </section>
    </div>
  );
}
