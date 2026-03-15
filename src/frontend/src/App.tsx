import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ChevronDown,
  Clock,
  Heart,
  Loader2,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "./hooks/useQueries";

const queryClient = new QueryClient();

const products = [
  {
    name: "Kaju Katli",
    image: "/assets/generated/mithai-kaju-katli.dim_400x400.jpg",
    description:
      "Melt-in-mouth cashew fudge with silver varak, made from premium Goa cashews",
    price: "₹350/box",
  },
  {
    name: "Gulab Jamun",
    image: "/assets/generated/mithai-gulab-jamun.dim_400x400.jpg",
    description:
      "Soft khoya dumplings soaked in rose-cardamom sugar syrup, garnished with pistachios",
    price: "₹180/dozen",
  },
  {
    name: "Rasmalai",
    image: "/assets/generated/mithai-rasmalai.dim_400x400.jpg",
    description:
      "Delicate chenna dumplings in rich saffron-cardamom cream milk, topped with almonds",
    price: "₹220/box",
  },
  {
    name: "Mango Cake",
    image: "/assets/generated/mithai-mango-cake.dim_400x400.jpg",
    description:
      "Alphonso mango celebration cake with saffron cream frosting and edible gold",
    price: "₹650",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    quote:
      "Their Kaju Katli is simply divine — exactly like what my nani used to make. We order every Diwali without fail!",
    stars: 5,
  },
  {
    name: "Rahul & Meera D.",
    quote:
      "Sweet Crumbs made our wedding mithai and it was the talk of the baraat. Everyone is still asking for the recipe!",
    stars: 5,
  },
  {
    name: "Anjali K.",
    quote:
      "The Rasmalai here melts in your mouth. I've tried many places in Bangalore, but nothing compares to this.",
    stars: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
} as any;

// Tricolor stripe — Indian flag top accent
function TricolorStripe() {
  return (
    <div className="flex w-full" aria-hidden="true">
      <div
        className="flex-1 h-[3px]"
        style={{ background: "oklch(0.72 0.18 52)" }}
      />
      <div className="flex-1 h-[3px] bg-white" />
      <div
        className="flex-1 h-[3px]"
        style={{ background: "oklch(0.48 0.16 155)" }}
      />
    </div>
  );
}

// Lotus SVG divider — 8-petal lotus in saffron
function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left wing */}
      <path
        d="M20 20 Q10 8 0 12 Q8 22 20 20Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M20 20 Q12 6 22 2 Q24 14 20 20Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Right wing */}
      <path
        d="M60 20 Q70 8 80 12 Q72 22 60 20Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M60 20 Q68 6 58 2 Q56 14 60 20Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Center petals */}
      <path
        d="M40 20 Q28 6 30 0 Q40 8 40 20Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M40 20 Q52 6 50 0 Q40 8 40 20Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M40 20 Q30 10 28 4 Q38 10 40 20Z"
        fill="currentColor"
        opacity="0.65"
      />
      <path
        d="M40 20 Q50 10 52 4 Q42 10 40 20Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Center circle */}
      <circle cx="40" cy="20" r="4" fill="currentColor" />
      {/* Stem line */}
      <line
        x1="0"
        y1="28"
        x2="36"
        y2="28"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.3"
      />
      <line
        x1="44"
        y1="28"
        x2="80"
        y2="28"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.3"
      />
    </svg>
  );
}

// Diamond divider: ◆ — ◆ — ◆
function DiamondDivider({ light = false }: { light?: boolean }) {
  const col = light
    ? "oklch(0.99 0.005 85 / 0.5)"
    : "oklch(var(--primary) / 0.5)";
  return (
    <div
      className="flex items-center justify-center gap-3 my-2"
      aria-hidden="true"
    >
      <div className="h-px flex-1" style={{ background: col, maxWidth: 80 }} />
      <span className="text-xs" style={{ color: col }}>
        ◆
      </span>
      <div className="h-px" style={{ background: col, width: 24 }} />
      <span className="text-xs" style={{ color: col }}>
        ◆
      </span>
      <div className="h-px" style={{ background: col, width: 24 }} />
      <span className="text-xs" style={{ color: col }}>
        ◆
      </span>
      <div className="h-px flex-1" style={{ background: col, maxWidth: 80 }} />
    </div>
  );
}

// Mandala watermark — decorative background SVG
function MandalaWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer ring of petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          // biome-ignore lint: static decorative element
          key={i}
          cx="200"
          cy="80"
          rx="12"
          ry="30"
          fill="currentColor"
          opacity="0.12"
          transform={`rotate(${i * 30} 200 200)`}
        />
      ))}
      {/* Mid ring */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          // biome-ignore lint: static decorative element
          key={i}
          cx="200"
          cy="120"
          rx="9"
          ry="22"
          fill="currentColor"
          opacity="0.1"
          transform={`rotate(${i * 45} 200 200)`}
        />
      ))}
      {/* Decorative circles */}
      <circle
        cx="200"
        cy="200"
        r="160"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.08"
        fill="none"
      />
      <circle
        cx="200"
        cy="200"
        r="120"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.1"
        fill="none"
      />
      <circle
        cx="200"
        cy="200"
        r="80"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
        fill="none"
      />
      <circle
        cx="200"
        cy="200"
        r="40"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.15"
        fill="none"
      />
      {/* Inner dots on circles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          // biome-ignore lint: static decorative element
          key={i}
          cx={200 + 120 * Math.cos((i * Math.PI * 2) / 12)}
          cy={200 + 120 * Math.sin((i * Math.PI * 2) / 12)}
          r="3"
          fill="currentColor"
          opacity="0.12"
        />
      ))}
      {/* Center flower */}
      <circle cx="200" cy="200" r="18" fill="currentColor" opacity="0.12" />
      <circle cx="200" cy="200" r="8" fill="currentColor" opacity="0.18" />
    </svg>
  );
}

// Section divider band with Indian geometric pattern
const BAND_COLORS = [
  { id: "s1", bg: "oklch(0.72 0.18 52 / 0.7)" },
  { id: "p1", bg: "oklch(var(--primary))" },
  { id: "c1", bg: "oklch(0.99 0.005 85 / 0.6)" },
  { id: "s2", bg: "oklch(0.72 0.18 52 / 0.7)" },
  { id: "p2", bg: "oklch(var(--primary))" },
  { id: "c2", bg: "oklch(0.99 0.005 85 / 0.6)" },
  { id: "s3", bg: "oklch(0.72 0.18 52 / 0.7)" },
  { id: "p3", bg: "oklch(var(--primary))" },
  { id: "c3", bg: "oklch(0.99 0.005 85 / 0.6)" },
  { id: "s4", bg: "oklch(0.72 0.18 52 / 0.7)" },
  { id: "p4", bg: "oklch(var(--primary))" },
  { id: "c4", bg: "oklch(0.99 0.005 85 / 0.6)" },
  { id: "s5", bg: "oklch(0.72 0.18 52 / 0.7)" },
  { id: "p5", bg: "oklch(var(--primary))" },
  { id: "c5", bg: "oklch(0.99 0.005 85 / 0.6)" },
  { id: "s6", bg: "oklch(0.72 0.18 52 / 0.7)" },
];
function PatternBand() {
  return (
    <div
      className="w-full py-4 overflow-hidden relative"
      style={{ background: "oklch(var(--accent))" }}
    >
      <div className="flex items-center justify-center gap-3">
        {BAND_COLORS.map(({ id, bg }) => (
          <div
            key={id}
            className="w-3 h-3 rotate-45"
            style={{ background: bg }}
          />
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "oklch(0.98 0.01 80)" }}
    >
      {/* Indian tricolor top stripe */}
      <TricolorStripe />

      {/* Decorative border below tricolor */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--primary) / 0.5), oklch(0.72 0.15 65), oklch(var(--primary) / 0.5), transparent)",
        }}
      />

      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        style={{ borderBottom: "1px solid oklch(var(--primary) / 0.15)" }}
      >
        {/* Logo with diya */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-saffron text-xl"
            style={{ background: "oklch(var(--primary))" }}
          >
            🪔
          </div>
          <div className="leading-tight">
            <span className="font-display font-800 text-base text-foreground block leading-none">
              मिठाई घर
            </span>
            <span
              className="font-body text-[10px] tracking-widest uppercase"
              style={{ color: "oklch(var(--accent))" }}
            >
              Sweet Crumbs
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-ocid={`nav.${l.label.toLowerCase()}.link`}
              className="px-4 py-2 text-sm font-body font-700 text-foreground/80 hover:text-foreground transition-colors rounded-md"
              style={{ letterSpacing: "0.02em" }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" data-ocid="nav.order_button">
            <Button
              size="sm"
              className="ml-2 font-700 text-primary-foreground shadow-saffron"
              style={{ background: "oklch(var(--primary))", border: "none" }}
            >
              🛒 Order Now
            </Button>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "oklch(0.98 0.01 80)",
              borderBottom: "1px solid oklch(var(--primary) / 0.2)",
            }}
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-ocid={`nav.mobile.${l.label.toLowerCase()}.link`}
                  className="px-3 py-2.5 text-sm font-body font-700 text-foreground rounded-md hover:bg-primary/10 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-indian-mithai.dim_1200x600.jpg"
          alt="Sweet Crumbs Indian Mithai Shop"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Saffron to crimson gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.38 0.15 20 / 0.82) 0%, oklch(0.55 0.18 35 / 0.65) 50%, oklch(0.45 0.18 52 / 0.75) 100%)",
          }}
        />
        {/* Subtle paisley CSS pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg, oklch(0.9 0.12 70) 0px, oklch(0.9 0.12 70) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(-60deg, oklch(0.9 0.12 70) 0px, oklch(0.9 0.12 70) 1px, transparent 1px, transparent 28px)",
          }}
        />
      </div>

      {/* Mandala watermark top-right */}
      <div
        className="absolute top-16 right-0 w-64 h-64 pointer-events-none"
        style={{ color: "oklch(0.9 0.1 70)" }}
      >
        <MandalaWatermark className="w-full h-full" />
      </div>
      <div
        className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
        style={{ color: "oklch(0.9 0.1 70)" }}
      >
        <MandalaWatermark className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div
            className="h-px w-12"
            style={{ background: "oklch(0.9 0.1 70 / 0.7)" }}
          />
          <p
            className="font-body text-xs uppercase tracking-[0.3em]"
            style={{ color: "oklch(0.9 0.1 70)" }}
          >
            Authentic Indian Mithai since 1998
          </p>
          <div
            className="h-px w-12"
            style={{ background: "oklch(0.9 0.1 70 / 0.7)" }}
          />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-3 text-balance"
        >
          स्वाद में परंपरा
        </motion.h1>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.5}
          className="font-display font-700 text-2xl sm:text-3xl mb-5"
          style={{ color: "oklch(0.92 0.12 70)" }}
        >
          Tradition in Taste
        </motion.h2>

        {/* Lotus divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.8}
          className="flex items-center justify-center mb-4"
          style={{ color: "oklch(0.92 0.12 70)" }}
        >
          <LotusIcon className="w-40 h-20" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-body text-lg max-w-xl mx-auto mb-10"
          style={{ color: "oklch(0.95 0.03 80 / 0.9)" }}
        >
          Handcrafted mithais and fusion cakes made fresh each morning with
          time-honoured family recipes passed down through generations.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#menu" data-ocid="hero.menu.primary_button">
            <Button
              size="lg"
              className="text-base px-8 font-700 shadow-saffron-lg text-primary-foreground"
              style={{ background: "oklch(var(--primary))", border: "none" }}
            >
              🍬 हमारी मिठाइयाँ देखें
            </Button>
          </a>
          <a href="#contact" data-ocid="hero.contact.secondary_button">
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 font-700"
              style={{
                borderColor: "oklch(var(--accent) / 0.8)",
                color: "white",
                background: "oklch(var(--accent) / 0.5)",
              }}
            >
              Order Now
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}

function MenuSection() {
  return (
    <section
      id="menu"
      className="py-24 px-4 sm:px-6 relative"
      style={{ background: "oklch(0.95 0.04 85)" }}
    >
      {/* Subtle mandala watermark */}
      <div
        className="absolute right-0 top-0 w-72 h-72 pointer-events-none opacity-40"
        style={{ color: "oklch(var(--primary))" }}
      >
        <MandalaWatermark className="w-full h-full" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p
            className="font-body text-xs uppercase tracking-[0.25em] mb-2"
            style={{ color: "oklch(var(--accent))" }}
          >
            Freshly Made Daily in Pure Desi Ghee
          </p>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-foreground mb-1">
            हमारी मिठाइयाँ
          </h2>
          <p
            className="font-body text-sm mb-3"
            style={{ color: "oklch(var(--accent))" }}
          >
            Our Sweets
          </p>
          <DiamondDivider />
          <p className="font-body text-muted-foreground max-w-md mx-auto mt-4">
            Every sweet crafted in small batches using traditional recipes, pure
            ghee, and the finest seasonal ingredients sourced across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i * 0.5}
              data-ocid={`menu.item.${i + 1}`}
              className="group rounded-2xl overflow-hidden hover:shadow-saffron-lg transition-all duration-300"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1.5px solid oklch(var(--accent) / 0.3)",
                boxShadow:
                  "inset 0 0 0 3px oklch(var(--primary) / 0.1), 0 2px 12px oklch(var(--primary) / 0.08)",
              }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Golden shimmer overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(var(--primary) / 0.2), transparent)",
                  }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-lg font-700 text-foreground leading-tight">
                    {product.name}
                  </h3>
                  <span
                    className="font-body text-sm font-700 whitespace-nowrap px-2 py-0.5 rounded-full text-primary-foreground"
                    style={{ background: "oklch(var(--primary))" }}
                  >
                    {product.price}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <>
      <PatternBand />
      <section
        id="about"
        className="py-24 px-4 sm:px-6 relative"
        style={{ background: "oklch(0.88 0.06 60)" }}
      >
        {/* Mandala watermark */}
        <div
          className="absolute left-0 bottom-0 w-80 h-80 pointer-events-none opacity-20"
          style={{ color: "oklch(var(--accent))" }}
        >
          <MandalaWatermark className="w-full h-full" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="rounded-3xl overflow-hidden shadow-saffron-lg"
                style={{ border: "3px solid oklch(var(--accent) / 0.5)" }}
              >
                <img
                  src="/assets/generated/hero-indian-mithai.dim_1200x600.jpg"
                  alt="Inside Sweet Crumbs Mithai Shop"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              {/* Diwali floating badge */}
              <div
                className="absolute -top-4 -right-4 text-white rounded-2xl px-4 py-3 shadow-saffron-lg flex items-center gap-2 sm:flex"
                style={{ background: "oklch(var(--accent))" }}
              >
                <span className="text-xl">🪔</span>
                <div>
                  <p className="font-display font-800 text-sm leading-none">
                    Diwali Special
                  </p>
                  <p className="font-body text-xs mt-0.5 opacity-90">2025</p>
                </div>
              </div>
              {/* Years badge */}
              <div
                className="absolute -bottom-5 -left-5 text-white rounded-2xl px-5 py-4 shadow-saffron-lg hidden sm:flex items-center gap-3"
                style={{ background: "oklch(var(--primary))" }}
              >
                <span className="text-2xl">🏅</span>
                <div>
                  <p className="font-display font-800 text-2xl leading-none">
                    25+
                  </p>
                  <p className="font-body text-xs mt-0.5 opacity-90">
                    Years of tradition
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <p
                className="font-body text-xs uppercase tracking-[0.25em] mb-3"
                style={{ color: "oklch(var(--accent))" }}
              >
                Our Story
              </p>
              <h2 className="font-display font-800 text-4xl sm:text-5xl text-foreground mb-1 leading-tight">
                हमारी कहानी
              </h2>
              <p
                className="font-body text-base mb-3"
                style={{ color: "oklch(var(--accent))" }}
              >
                A Legacy of Sweetness & Love
              </p>
              <DiamondDivider />
              <div className="space-y-4 font-body text-foreground/85 leading-relaxed mt-5">
                <p>
                  Since 1998, our family has been waking up at 4am every day to
                  prepare traditional mithais using pure desi ghee, farm-fresh
                  milk, and time-honoured recipes that our dadiji passed down
                  with love.
                </p>
                <p>
                  From Diwali boxes to wedding baraat spreads, every piece of
                  mithai leaves our kitchen carrying the warmth of Indian
                  hospitality. We never compromise on purity — no artificial
                  colours, no preservatives, only the real flavours of India.
                </p>
              </div>

              {/* Feature badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { emoji: "🥛", label: "Pure Desi Ghee" },
                  { emoji: "🌿", label: "No Preservatives" },
                  { emoji: "📜", label: "Traditional Recipes" },
                  { emoji: "🏠", label: "Family Business" },
                ].map(({ emoji, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-700 text-white shadow-saffron"
                    style={{ background: "oklch(var(--accent))" }}
                  >
                    <span>{emoji}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <PatternBand />
    </>
  );
}

function TestimonialsSection() {
  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "oklch(0.35 0.12 20)" }}
    >
      {/* Mandala watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-15"
        style={{ color: "oklch(0.85 0.12 60)" }}
      >
        <MandalaWatermark className="w-full h-full" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p
            className="font-body text-xs uppercase tracking-[0.25em] mb-3"
            style={{ color: "oklch(0.75 0.12 65)" }}
          >
            What our customers say
          </p>
          <h2
            className="font-display font-800 text-4xl sm:text-5xl mb-1"
            style={{ color: "oklch(0.97 0.02 80)" }}
          >
            ग्राहकों की राय
          </h2>
          <p
            className="font-body text-sm mb-3"
            style={{ color: "oklch(0.75 0.12 65)" }}
          >
            Loved Across Bangalore
          </p>
          <DiamondDivider light />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i * 0.4}
              data-ocid={`testimonials.item.${i + 1}`}
              className="rounded-2xl p-7 flex flex-col gap-4"
              style={{
                background: "oklch(0.28 0.10 20 / 0.7)",
                border: "1.5px solid oklch(0.72 0.15 65 / 0.4)",
                boxShadow: "inset 0 0 0 1px oklch(0.85 0.1 60 / 0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex gap-1">
                {["1", "2", "3", "4", "5"].slice(0, t.stars).map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4"
                    style={{
                      fill: "oklch(0.82 0.16 70)",
                      color: "oklch(0.82 0.16 70)",
                    }}
                  />
                ))}
              </div>
              <p
                className="font-body leading-relaxed text-sm flex-1"
                style={{ color: "oklch(0.88 0.02 80)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <p
                className="font-display font-700 text-sm"
                style={{ color: "oklch(0.78 0.12 65)" }}
              >
                — {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { mutate: submitInquiry, isPending } = useSubmitInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry(
      { id: crypto.randomUUID(), name, email, message },
      {
        onSuccess: () => {
          toast.success("Message sent! We'll get back to you soon.");
          setName("");
          setEmail("");
          setMessage("");
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Festive booking banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center rounded-2xl px-6 py-4 mb-10 font-body font-700 text-white text-sm shadow-saffron"
          style={{
            background:
              "linear-gradient(90deg, oklch(var(--accent)), oklch(var(--primary)), oklch(var(--accent)))",
          }}
        >
          🎉 Advance Booking Open for Diwali 2025! Order your festive mithai
          boxes today.
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p
            className="font-body text-xs uppercase tracking-[0.25em] mb-3"
            style={{ color: "oklch(var(--accent))" }}
          >
            Get in Touch
          </p>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-foreground mb-1">
            आर्डर करें
          </h2>
          <p
            className="font-body text-sm mb-3"
            style={{ color: "oklch(var(--accent))" }}
          >
            Place an Order
          </p>
          <DiamondDivider />
          <p className="font-body text-muted-foreground max-w-md mx-auto mt-4">
            Custom mithai boxes, wedding orders, or bulk festive sweets — we'd
            love to craft something special for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              data-ocid="contact.panel"
              className="rounded-2xl p-8 space-y-6"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1.5px solid oklch(var(--accent) / 0.25)",
                boxShadow:
                  "inset 0 0 0 3px oklch(var(--primary) / 0.06), 0 8px 32px oklch(var(--primary) / 0.1)",
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="font-body text-sm font-700">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-ocid="contact.name.input"
                  className="font-body"
                  style={{ borderColor: "oklch(var(--primary) / 0.3)" }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body text-sm font-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-ocid="contact.email.input"
                  className="font-body"
                  style={{ borderColor: "oklch(var(--primary) / 0.3)" }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-body text-sm font-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your order — which mithais, quantity, occasion date, delivery address..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  data-ocid="contact.message.textarea"
                  className="font-body resize-none"
                  style={{ borderColor: "oklch(var(--primary) / 0.3)" }}
                />
              </div>
              <Button
                type="submit"
                className="w-full font-700 text-primary-foreground shadow-saffron"
                size="lg"
                disabled={isPending}
                data-ocid="contact.submit_button"
                style={{ background: "oklch(var(--primary))", border: "none" }}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "🛒 Send Order Request"
                )}
              </Button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {[
              {
                icon: MapPin,
                label: "Visit Us",
                lines: ["14 MG Road", "Bangalore 560001, Karnataka"],
              },
              {
                icon: Clock,
                label: "Opening Hours",
                lines: [
                  "Mon – Sat: 8:00 am – 9:00 pm",
                  "Sun: 9:00 am – 7:00 pm",
                ],
              },
              {
                icon: Phone,
                label: "Phone",
                lines: ["+91 98765 43210"],
              },
            ].map(({ icon: Icon, label, lines }) => (
              <div key={label} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "oklch(var(--primary) / 0.12)" }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-700 text-foreground mb-1">
                    {label}
                  </p>
                  {lines.map((line) => (
                    <p
                      key={line}
                      className="font-body text-sm text-muted-foreground"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Festive occasions note */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "oklch(var(--primary) / 0.08)",
                border: "1px solid oklch(var(--primary) / 0.25)",
              }}
            >
              <p className="font-display font-700 text-foreground mb-2">
                🪔 Festive Orders
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Advance booking recommended for Diwali, Holi, Eid, Christmas and
                wedding season. Contact us 2 weeks ahead for bulk orders.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="text-primary-foreground py-12 px-4 sm:px-6"
      style={{ background: "oklch(0.2 0.08 20)" }}
    >
      {/* Tricolor + golden decorative band */}
      <div className="mb-8">
        <div className="flex w-full">
          <div
            className="flex-1 h-[3px]"
            style={{ background: "oklch(0.72 0.18 52)" }}
          />
          <div
            className="flex-1 h-[3px]"
            style={{ background: "oklch(0.82 0.15 70)" }}
          />
          <div
            className="flex-1 h-[3px]"
            style={{ background: "oklch(0.48 0.16 155)" }}
          />
        </div>
        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.82 0.15 70 / 0.5), oklch(0.72 0.18 52 / 0.7), oklch(0.82 0.15 70 / 0.5), transparent)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                style={{ background: "oklch(var(--primary))" }}
              >
                🪔
              </div>
              <div>
                <span className="font-display font-800 text-base block leading-none text-white">
                  मिठाई घर
                </span>
                <span
                  className="font-body text-[10px] tracking-widest uppercase"
                  style={{ color: "oklch(0.75 0.12 65)" }}
                >
                  Sweet Crumbs
                </span>
              </div>
            </div>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.65 0.06 40)" }}
            >
              Crafting authentic Indian sweets in Bangalore since 1998
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {["Home", "Menu", "About", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                data-ocid={`footer.${l.toLowerCase()}.link`}
                className="font-body text-sm hover:text-white transition-colors"
                style={{ color: "oklch(0.65 0.06 40)" }}
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center"
          style={{ borderColor: "oklch(0.35 0.05 30)" }}
        >
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.45 0.04 35)" }}
          >
            © {year}. Built with{" "}
            <Heart className="inline w-3 h-3 fill-current" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function BakeryApp() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BakeryApp />
    </QueryClientProvider>
  );
}
