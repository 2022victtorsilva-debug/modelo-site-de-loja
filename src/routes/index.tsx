import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, MessageCircle, MapPin, Phone, Star, ArrowRight } from "lucide-react";

import hero from "@/assets/hero.jpg";
import vestidos from "@/assets/vestidos.jpg";
import conjuntos from "@/assets/conjuntos.jpg";
import blusas from "@/assets/blusas.jpg";
import calcas from "@/assets/calcas.jpg";
import lookA from "@/assets/lookA.jpg";
import lookB from "@/assets/lookB.jpg";
import loja from "@/assets/loja.jpg";

const ENDERECO = "Rua Exemplo, 100 - Centro, Barreiras - BA";
const TELEFONE = "(00) 00000-0000";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vitta Moda — Moda Feminina em Barreiras, BA" },
      {
        name: "description",
        content: "Vitta Moda: loja de roupas femininas em Barreiras - BA. Vestidos, conjuntos, blusas e calças. Visite nossa loja no Centro.",
      },
      { property: "og:title", content: "Vitta Moda — Moda Feminina em Barreiras, BA" },
      {
        property: "og:description",
        content: "Vitrine digital da Vitta Moda, loja de moda feminina no Centro de Barreiras - BA. Novidades e coleção.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: "Vitta Moda",
          description: "Loja de moda feminina em Barreiras, Bahia.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Exemplo, 100",
            addressLocality: "Barreiras",
            addressRegion: "BA",
            addressCountry: "BR",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Novidades", href: "#novidades" },
  { label: "Coleção", href: "#colecao" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      {children}
    </div>
  );
}

function WhatsButton({
  children = "Falar pelo WhatsApp",
  variant = "solid",
}: {
  children?: ReactNode;
  variant?: "solid" | "outline";
}) {
  const base = "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] transition-all duration-300";
  return (
    <button
      type="button"
      className={variant === "solid"
        ? `${base} bg-primary text-primary-foreground hover:bg-foreground`
        : `${base} border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background`}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </button>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-body text-foreground antialiased">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border/70 bg-background/90 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:py-5">
          <a href="#inicio" className="min-w-0">
            <span className="font-display text-2xl tracking-[0.28em] uppercase">Vitta</span>
            <span className="ml-2 text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">Moda</span>
          </a>
          <div className="flex items-center gap-8">
            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground">{n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <button type="button" className="hidden shrink-0 border border-foreground/25 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background sm:inline-flex">WhatsApp</button>
            <button type="button" onClick={() => setOpen(true)} aria-label="Abrir menu" className="shrink-0 p-1.5 lg:hidden"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] bg-background transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-2xl uppercase tracking-[0.28em]">Vitta</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu" className="p-1.5"><X className="h-6 w-6" /></button>
        </div>
        <nav aria-label="Navegação mobile" className="px-6 pt-10">
          <ul className="space-y-7">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="font-display text-4xl tracking-tight">{n.label}</a></li>
            ))}
          </ul>
          <div className="mt-14"><WhatsButton /></div>
        </nav>
      </div>

      <main>
        <section id="inicio" className="relative">
          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="order-2 flex items-center px-6 py-16 sm:px-10 lg:order-1 lg:px-16 lg:py-0">
              <div className="max-w-lg">
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">Barreiras · Bahia</p>
                <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Seu estilo<br />começa aqui.</h1>
                <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">A Vitta Moda é uma loja de moda feminina no Centro de Barreiras. Peças pensadas para o dia a dia, para o trabalho e para os momentos especiais.</p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a href="#novidades" className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-foreground">Ver novidades <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                  <WhatsButton variant="outline" />
                </div>
              </div>
            </div>
            <div className="order-1 h-[58vh] lg:order-2 lg:h-auto">
              <img src={hero} alt="Modelo usando vestido de linho bege em ensaio de moda feminina da Vitta Moda" width={1408} height={1760} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section id="colecao" className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-xl">
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">Coleção</p>
                <h2 className="mt-5 font-display text-4xl tracking-tight sm:text-5xl">Destaques da Semana</h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Uma seleção visual de categorias femininas. Consulte pelo WhatsApp as peças disponíveis na loja.</p>
              </div>
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {[
                { img: vestidos, t: "Vestidos", alt: "Vestido midi em tom creme" },
                { img: conjuntos, t: "Conjuntos", alt: "Conjunto feminino em tom marrom suave" },
                { img: blusas, t: "Blusas", alt: "Blusa branca de seda em detalhe" },
                { img: calcas, t: "Calças", alt: "Calça pantalona bege com blusa clara" },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 90}>
                  <div role="button" tabIndex={0} className="group block cursor-pointer">
                    <div className="overflow-hidden bg-muted"><img src={c.img} alt={c.alt} loading="lazy" width={900} height={1200} className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div>
                    <div className="mt-4 flex items-center justify-between"><h3 className="font-display text-xl tracking-tight">{c.t}</h3><ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" /></div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-xs leading-relaxed text-muted-foreground">As imagens desta seção são meramente ilustrativas e serão substituídas por fotos reais das peças da loja.</p>
          </div>
        </section>

        <section id="novidades" className="bg-secondary/60 px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal><h2 className="max-w-xl font-display text-4xl tracking-tight sm:text-5xl">Novidades que chegaram</h2></Reveal>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <Reveal><article className="group relative overflow-hidden bg-card"><img src={lookA} alt="Look feminino completo com blazer preto e calça off-white" loading="lazy" width={1200} height={1500} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-[3/4]" /><span className="absolute left-4 top-4 bg-background px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.25em]">Novo</span></article></Reveal>
              <Reveal delay={100}>
                <div className="flex h-full flex-col gap-6">
                  <article className="group relative overflow-hidden bg-card"><img src={lookB} alt="Detalhe de tecidos leves em tons neutros" loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /><span className="absolute left-4 top-4 bg-background px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.25em]">Tendência</span></article>
                  <div className="flex flex-1 flex-col justify-center border border-border bg-card p-8"><p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Destaque</p><p className="mt-4 font-display text-2xl leading-snug tracking-tight">Peças novas chegam com frequência à loja.</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Consulte tamanhos, cores e disponibilidade diretamente com a nossa equipe.</p></div>
                </div>
              </Reveal>
              <Reveal delay={200}><article className="group relative overflow-hidden bg-card"><img src={conjuntos} alt="Conjunto feminino em tom terroso" loading="lazy" width={900} height={1200} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-[3/4]" /><span className="absolute left-4 top-4 bg-background px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.25em]">Destaque</span></article></Reveal>
            </div>
            <div className="mt-12"><WhatsButton>Consultar pelo WhatsApp</WhatsButton></div>
          </div>
        </section>

        <section id="sobre" className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal><img src={loja} alt="Interior de loja de roupas femininas com araras e iluminação suave" loading="lazy" width={1400} height={1000} className="aspect-[4/3] w-full object-cover" /></Reveal>
            <Reveal delay={120}>
              <div className="max-w-lg">
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">Sobre</p>
                <h2 className="mt-5 font-display text-4xl tracking-tight sm:text-5xl">A Vitta Moda</h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">A Vitta Moda é uma loja de roupas femininas localizada no Centro de Barreiras, na Bahia. A proposta é reunir peças que combinam conforto e elegância, com um atendimento próximo e atencioso.</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">Nossa vitrine acompanha as tendências da moda feminina e recebe novidades com frequência. Visite a loja ou fale conosco pelo WhatsApp para conhecer as peças disponíveis.</p>
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8"><div><dt className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">Localização</dt><dd className="mt-2 text-sm">Centro · Barreiras - BA</dd></div><div><dt className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">Atendimento</dt><dd className="mt-2 text-sm">Loja física e WhatsApp</dd></div></dl>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-secondary/60 px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal><p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">Depoimentos</p><h2 className="mt-5 font-display text-4xl tracking-tight sm:text-5xl">Experiência das clientes</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">Este espaço está reservado para as avaliações reais das clientes da Vitta Moda. Ainda não publicamos depoimentos aqui.</p></Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">{[0, 1, 2].map((i) => (<Reveal key={i} delay={i * 90}><div className="flex h-full flex-col items-center justify-center border border-dashed border-border bg-card/60 p-10"><div className="flex gap-1 text-accent" aria-hidden="true">{[0, 1, 2, 3, 4].map((s) => (<Star key={s} className="h-4 w-4" />))}</div><p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">Espaço para avaliação</p></div></Reveal>))}</div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:py-32"><Reveal><div className="mx-auto max-w-3xl text-center"><h2 className="font-display text-4xl leading-tight tracking-tight sm:text-6xl">Encontrou seu próximo look?</h2><p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">Fale com a Vitta Moda pelo WhatsApp e consulte as novidades disponíveis.</p><div className="mt-10 flex justify-center"><WhatsButton /></div></div></Reveal></section>

        <section id="contato" className="border-t border-border px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal><div className="max-w-md"><p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">Contato</p><h2 className="mt-5 font-display text-4xl tracking-tight sm:text-5xl">Visite nossa loja</h2><address className="mt-8 space-y-5 not-italic"><p className="font-display text-2xl tracking-tight">Vitta Moda</p><p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{ENDERECO}</p><p className="flex items-center gap-3 text-sm text-muted-foreground"><Phone className="h-4 w-4 shrink-0" aria-hidden="true" /><span>{TELEFONE}</span></p></address><div className="mt-10 flex flex-col gap-3 sm:flex-row"><button type="button" className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-foreground"><MapPin className="h-4 w-4" aria-hidden="true" />Como chegar</button><WhatsButton variant="outline" /></div></div></Reveal>
            <Reveal delay={120}><div className="h-[320px] w-full overflow-hidden border border-border sm:h-[420px]"><div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-muted text-muted-foreground"><MapPin className="h-6 w-6" aria-hidden="true" /><p className="text-[0.65rem] uppercase tracking-[0.3em]">Mapa em breve</p></div></div></Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-primary px-5 py-16 text-primary-foreground sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div><p className="font-display text-3xl uppercase tracking-[0.28em]">Vitta</p><p className="mt-2 text-[0.6rem] uppercase tracking-[0.4em] opacity-70">Moda</p><p className="mt-6 max-w-xs text-sm leading-relaxed opacity-75">Moda feminina em Barreiras, Bahia.</p></div>
          <div><p className="text-[0.6rem] uppercase tracking-[0.3em] opacity-60">Contato</p><p className="mt-5 text-sm leading-relaxed opacity-85">{ENDERECO}</p><p className="mt-3 text-sm opacity-85"><span>{TELEFONE}</span></p><p className="mt-3 text-sm opacity-85"><span className="underline underline-offset-4">WhatsApp</span></p></div>
          <div><p className="text-[0.6rem] uppercase tracking-[0.3em] opacity-60">Navegação</p><ul className="mt-5 space-y-3">{NAV.map((n) => (<li key={n.href}><a href={n.href} className="text-sm opacity-85 transition-opacity hover:opacity-100">{n.label}</a></li>))}</ul></div>
        </div>
        <div className="mx-auto mt-14 max-w-7xl border-t border-primary-foreground/15 pt-6"><p className="text-[0.65rem] uppercase tracking-[0.2em] opacity-60">© {new Date().getFullYear()} Vitta Moda — Barreiras, BA</p></div>
      </footer>
    </div>
  );
}
