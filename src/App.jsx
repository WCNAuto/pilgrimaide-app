import React, { useState, useMemo, useEffect } from "react";
import {
  ShoppingBag, Sparkles, MapPin, Star, PlayCircle, Crown, ChevronRight,
  ChevronLeft, Search, Home, User, Calendar, Flame, Bell, Check,
  ArrowRight, Plus, Minus, Heart, X, Menu, Compass, AlertTriangle, Lock
} from "lucide-react";

/* ============================================================================
   DESIGN TOKENS
   Deep temple maroon + antique gold + warm ivory. Devanagari-inflected serif
   for display type (Tiro Devanagari fallback to Georgia serif), clean
   grotesk for UI/body. Motif: the diya (lamp) flame and the temple arch,
   used sparingly as the signature shape language throughout.
============================================================================ */
const T = {
  maroon: "#6B1420",
  maroonDeep: "#3D0B11",
  maroonSoft: "#8A2233",
  gold: "#C8960C",
  goldLight: "#E8B84B",
  goldPale: "#F7ECD4",
  ivory: "#FFFDF9",
  paper: "#FAF5EC",
  ink: "#241A17",
  slate: "#6B5A52",
  line: "#E9DDC8",
  good: "#3F6B3A",
};

/* ============================================================================
   REAL PRODUCT DATA — sourced from pilgrimaide.com live catalogue
============================================================================ */
const PRODUCTS = [
  { id: "p1", name: "Brass Hanuman Idol, 2.5 Inch", price: 760, cat: "Idols", deity: ["Hanuman"], img: "hanuman", desc: "Nickel plated die-cast murti, Hanuman in ashirvad pose holding gadha. Ideal for daily pooja and home temple." },
  { id: "p2", name: "Brass Lakshmi Idol, 2 Inch", price: 400, cat: "Idols", deity: ["Lakshmi"], img: "lakshmi", desc: "Plated die-cast Kamal-seated Lakshmi Devi murti. Brings blessings of prosperity and purity." },
  { id: "p3", name: "Brass Vishnu Lakshmi Idol, 2 Inch", price: 420, cat: "Idols", deity: ["Vishnu", "Lakshmi"], img: "vishnu", desc: "Diecast idol with clearly defined divine detail and plating that needs no polishing." },
  { id: "p4", name: "Brass Saraswati Idol on Lotus, 2 Inch", price: 380, cat: "Idols", deity: ["Saraswati"], img: "saraswati", desc: "Diecast technique for sharp detailing. Ideal for daily pooja, study tables, and Vastu placement." },
  { id: "p5", name: "Brass Annapurna Idol, 2 Inch", price: 410, cat: "Idols", deity: ["Annapurna"], img: "annapurna", desc: "Diecast plated finish, symbol of food, prosperity, and nourishment in pooja rituals." },
  { id: "p6", name: "Brass Ladoo Gopal Idol, 3 Inch", price: 690, cat: "Idols", deity: ["Krishna"], img: "gopal", desc: "Solid brass, ideal for daily pooja, Janmashtami worship, and home mandir placement." },
  { id: "p7", name: "Ganesh Pooja Kit / Sampoorna Samagri", price: 549, cat: "Kits", deity: ["Ganesh"], img: "ganeshkit", desc: "Comprehensive Puja Samagri Kit for a harmonious Ganesh Chaturthi. Premium ingredients, ready to use." },
  { id: "p8", name: "Satyanarayan Pooja Kit", price: 599, cat: "Kits", deity: ["Vishnu"], img: "satyakit", desc: "Sampoorna Sri Satya Narayan Katha Puja Kit. A complete set of divine essentials for home worship." },
  { id: "p9", name: "Brass Hanging Diya, 7 Mukhi", price: 350, cat: "Brass", deity: [], img: "diya7", desc: "Laman Divi, 7 faced oil lamp, doubles as hanging diya and tabletop lamp." },
  { id: "p10", name: "Brass Pooja Plate / Arti Thali", price: 280, cat: "Brass", deity: [], img: "thali", desc: "Vintage etching design, 4.5 inch diameter. Serves as aarti thali, diya holder, and dhoop stand." },
  { id: "p11", name: "Kansa / Bronze Pooja Bell", price: 320, cat: "Brass", deity: [], img: "bell", desc: "Authentic kansa bronze handbell with intricate engravings and a melodious sacred chime." },
  { id: "p12", name: "Black Stone Shivling Set", price: 450, cat: "Idols", deity: ["Shiva"], img: "shivling", desc: "Meticulously crafted black stone Shivling set, an essential for daily pooja rituals." },
  { id: "p13", name: "Stainless Steel Hawan Kund, 5 Inch", price: 390, cat: "Havan", deity: [], img: "havankund", desc: "Durable rust-resistant kund for sacred fire rituals, havan, yagna, and pooja." },
  { id: "p14", name: "Mangaldeep Flora Exotic Dhoop Sticks", price: 95, cat: "Fragrance", deity: [], img: "dhoop", desc: "Premium dhoop sticks with an exotic Ylang fragrance, ideal for daily pooja and spiritual rituals." },
  { id: "p15", name: "Bhawani Kashi Ashtagandha Chandan", price: 75, cat: "Pooja Samagri", deity: [], img: "chandan", desc: "Sacred blend of eight elements crafted from premium sandalwood from Varanasi/Kashi." },
];

const KITS = [
  { id: "k1", name: "Sadhna Box", price: 299, period: "/month", tag: "Starter", items: "Seasonal incense set, one devotional item, festival guide card", color: T.goldPale },
  { id: "k2", name: "Siddhi Box", price: 999, period: "/month", tag: "Premium", items: "Personalised by deity & festival calendar, premium items, ritual guidance card", color: T.gold, featured: true },
];

const TEMPLES = [
  { id: "t1", name: "Kashi Vishwanath", city: "Varanasi, UP", deity: "Shiva", tag: "Jyotirlinga", desc: "One of the twelve Jyotirlingas, on the banks of the Ganges. The most revered Shiva shrine in India." },
  { id: "t2", name: "Tirupati Balaji", city: "Tirupati, AP", deity: "Vishnu", tag: "Char Dham circuit", desc: "Shrine of Lord Venkateswara, among the most visited pilgrimage sites in the world." },
  { id: "t3", name: "Siddhivinayak", city: "Mumbai, MH", deity: "Ganesh", tag: "City shrine", desc: "Founded in 1801, one of the richest and most visited Ganesh temples in India." },
  { id: "t4", name: "Vaishno Devi", city: "Katra, J&K", deity: "Durga", tag: "Shakti Peetha", desc: "Cave shrine of the Mother Goddess in the Trikuta hills, among India's holiest Devi sites." },
  { id: "t5", name: "Somnath", city: "Gujarat", deity: "Shiva", tag: "Jyotirlinga", desc: "The first among the twelve Jyotirlingas, rebuilt many times, standing eternal by the sea." },
  { id: "t6", name: "Ayodhya Ram Mandir", city: "Ayodhya, UP", deity: "Ram", tag: "Newly consecrated", desc: "The birthplace shrine of Lord Ram, consecrated in 2024, now among India's most visited sites." },
];

const PACKAGES = [
  { id: "pk1", title: "Char Dham Yatra", days: 12, temples: "Yamunotri, Gangotri, Kedarnath, Badrinath", from: "₹38,000", dep: "Delhi, Haridwar" },
  { id: "pk2", title: "Kashi – Ayodhya – Prayagraj Circuit", days: 5, temples: "Kashi Vishwanath, Ram Mandir, Sangam", from: "₹14,500", dep: "Mumbai, Delhi" },
  { id: "pk3", title: "Jyotirlinga Darshan, Maharashtra", days: 4, temples: "Trimbakeshwar, Bhimashankar, Grishneshwar", from: "₹9,200", dep: "Mumbai, Thane" },
];

const PANDITS = [
  { id: "pd1", name: "Pandit Ramesh Joshi", city: "Thane", years: 22, rating: 4.9, lang: "Hindi, Marathi, Sanskrit", spec: "Satyanarayan, Griha Pravesh" },
  { id: "pd2", name: "Pandit Vinayak Kulkarni", city: "Mumbai", years: 15, rating: 4.8, lang: "Marathi, Hindi", spec: "Navchandi, Rudrabhishek" },
  { id: "pd3", name: "Pandit Suresh Dixit", city: "Thane", years: 30, rating: 5.0, lang: "Hindi, Sanskrit", spec: "Mundan, Naamkaran, Pitru Tarpan" },
];

const CONTENT = [
  { id: "c1", title: "Why We Celebrate Ganesh Chaturthi", type: "Festival Significance", tag: "Ganesh", dur: "4 min" },
  { id: "c2", title: "Complete Guide to Kashi Vishwanath", type: "Pilgrimage Guide", tag: "Shiva", dur: "9 min" },
  { id: "c3", title: "How to Set Up a Home Pooja Room", type: "Ritual How-To", tag: "General", dur: "6 min" },
  { id: "c4", title: "The Story of the Twelve Jyotirlingas", type: "Temple Story", tag: "Shiva", dur: "7 min" },
];

const DEITIES = [
  { id: "Ganesh", label: "Ganesh" }, { id: "Shiva", label: "Shiva" }, { id: "Vishnu", label: "Vishnu" },
  { id: "Lakshmi", label: "Lakshmi" }, { id: "Durga", label: "Durga / Devi" }, { id: "Hanuman", label: "Hanuman" },
  { id: "Krishna", label: "Krishna" }, { id: "Saraswati", label: "Saraswati" },
];

const FESTIVALS_BY_DEITY = {
  Ganesh: { name: "Ganesh Chaturthi", days: 12, kit: "p7" },
  Shiva: { name: "Maha Shivratri", days: 47, kit: "p12" },
  Vishnu: { name: "Satyanarayan Puja", days: 6, kit: "p8" },
  Lakshmi: { name: "Diwali — Lakshmi Puja", days: 84, kit: "p2" },
  Durga: { name: "Navratri", days: 31, kit: "p10" },
  Hanuman: { name: "Hanuman Jayanti", days: 19, kit: "p1" },
  Krishna: { name: "Janmashtami", days: 56, kit: "p6" },
  Saraswati: { name: "Vasant Panchami", days: 22, kit: "p4" },
};

/* ============================================================================
   ICON GLYPHS for product art (no external images — flat sacred-geometry
   style glyphs drawn in CSS/SVG, consistent with the brand signature)
============================================================================ */
function ProductGlyph({ type, size = 56 }) {
  const glyphs = {
    hanuman: "🪔", lakshmi: "🪷", vishnu: "🕉️", saraswati: "🎵", annapurna: "🍲",
    gopal: "🦚", ganeshkit: "🐘", satyakit: "📿", diya7: "🪔", thali: "🍽️",
    bell: "🔔", shivling: "🔱", havankund: "🔥", dhoop: "🪵", chandan: "🌿",
  };
  return <span style={{ fontSize: size * 0.5, lineHeight: 1 }}>{glyphs[type] || "✨"}</span>;
}

/* ============================================================================
   SHARED UI ATOMS
============================================================================ */
function ArchCard({ children, style = {}, onClick, glow }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: T.ivory,
        borderRadius: "18px 18px 8px 8px",
        border: `1px solid ${T.line}`,
        boxShadow: glow ? `0 8px 24px -8px ${T.gold}55` : "0 2px 10px -4px rgba(36,26,23,0.08)",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        ...style,
      }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.transform = "translateY(-2px)"; } }}
      onMouseLeave={e => { if (onClick) { e.currentTarget.style.transform = "translateY(0)"; } }}
    >
      {children}
    </div>
  );
}

function Pill({ children, tone = "gold", style = {} }) {
  const tones = {
    gold: { bg: T.goldPale, color: "#7A5C0E" },
    maroon: { bg: "#F3E2E2", color: T.maroon },
    good: { bg: "#E4EFE2", color: T.good },
  };
  const c = tones[tone];
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 999,
      background: c.bg, color: c.color, fontSize: 11, fontWeight: 600,
      letterSpacing: 0.3, ...style
    }}>{children}</span>
  );
}

function PrimaryBtn({ children, onClick, style = {}, full }) {
  return (
    <button onClick={onClick} style={{
      background: T.maroon, color: T.ivory, border: "none", borderRadius: 10,
      padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      width: full ? "100%" : "auto", transition: "background 0.15s",
      ...style
    }}
      onMouseEnter={e => e.currentTarget.style.background = T.maroonSoft}
      onMouseLeave={e => e.currentTarget.style.background = style.background || T.maroon}
    >{children}</button>
  );
}

function GhostBtn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      background: "transparent", color: T.maroon, border: `1.5px solid ${T.maroon}`,
      borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      ...style
    }}>{children}</button>
  );
}

function SectionLabel({ children, icon: Icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      {Icon && <Icon size={16} color={T.gold} />}
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: T.gold, textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

/* ============================================================================
   BOTTOM NAV (mobile-app feel, since this is a phone-first product)
============================================================================ */
function BottomNav({ page, go }) {
  const items = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "store", icon: ShoppingBag, label: "Store" },
    { id: "rituals", icon: Flame, label: "Rituals" },
    { id: "pilgrimage", icon: MapPin, label: "Yatra" },
    { id: "astrology", icon: Star, label: "Astro" },
  ];
  return (
    <div style={{
      position: "sticky", bottom: 0, left: 0, right: 0, background: T.ivory,
      borderTop: `1px solid ${T.line}`, display: "flex", padding: "8px 4px 10px",
      boxShadow: "0 -4px 16px rgba(0,0,0,0.05)", zIndex: 50
    }}>
      {items.map(it => {
        const active = page === it.id;
        return (
          <button key={it.id} onClick={() => go(it.id)} style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 0"
          }}>
            <it.icon size={20} color={active ? T.maroon : T.slate} strokeWidth={active ? 2.4 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? T.maroon : T.slate }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function TopBar({ title, onBack, right }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 18px 12px", position: "sticky", top: 0, background: T.paper, zIndex: 40
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{ background: T.ivory, border: `1px solid ${T.line}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronLeft size={18} color={T.ink} />
          </button>
        )}
        <span style={{ fontFamily: "Georgia, 'Tiro Devanagari Hindi', serif", fontSize: 19, fontWeight: 700, color: T.ink }}>{title}</span>
      </div>
      {right}
    </div>
  );
}

/* ============================================================================
   PAGE: ONBOARDING
============================================================================ */
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ phone: "", name: "", dob: "", city: "", deities: [], gotra: "" });
  const total = 6;

  const next = () => setStep(s => Math.min(s + 1, total));
  const toggleDeity = (id) => {
    setProfile(p => {
      const has = p.deities.includes(id);
      const deities = has ? p.deities.filter(d => d !== id) : (p.deities.length < 2 ? [...p.deities, id] : p.deities);
      return { ...p, deities };
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${T.maroonDeep} 0%, ${T.maroon} 38%, ${T.paper} 38%)`, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "36px 24px 0", textAlign: "center" }}>
        <div style={{ fontSize: 30, marginBottom: 6 }}>🕉️</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: T.ivory, letterSpacing: 1 }}>PILGRIMAIDE</div>
        <div style={{ fontSize: 12, color: T.goldLight, marginTop: 4, fontStyle: "italic" }}>Your spiritual journey, in one place</div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "26px 18px 18px" }}>
        <div style={{ width: "100%", maxWidth: 420, background: T.ivory, borderRadius: 20, padding: 26, boxShadow: "0 20px 50px -20px rgba(0,0,0,0.3)" }}>
          {/* progress */}
          <div style={{ display: "flex", gap: 5, marginBottom: 22 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? T.gold : T.line }} />
            ))}
          </div>

          {step === 0 && (
            <div>
              <h3 style={S.h3}>What's your mobile number?</h3>
              <p style={S.p}>We'll send a one-time code. No password to remember.</p>
              <input style={S.input} placeholder="+91 98765 43210" value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              <PrimaryBtn full style={{ marginTop: 18 }} onClick={next}>Continue <ArrowRight size={15} /></PrimaryBtn>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 style={S.h3}>What should we call you?</h3>
              <p style={S.p}>Your name as your pandit will address it during sankalp.</p>
              <input style={S.input} placeholder="Full name" value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })} />
              <PrimaryBtn full style={{ marginTop: 18 }} onClick={next}>Continue <ArrowRight size={15} /></PrimaryBtn>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={S.h3}>Date of birth</h3>
              <p style={S.p}>So we can personalise your festival calendar and ritual guidance.</p>
              <input style={S.input} type="date" value={profile.dob}
                onChange={e => setProfile({ ...profile, dob: e.target.value })} />
              <PrimaryBtn full style={{ marginTop: 18 }} onClick={next}>Continue <ArrowRight size={15} /></PrimaryBtn>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={S.h3}>Choose your primary deity</h3>
              <p style={S.p}>Pick up to two. This shapes everything we show you.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                {DEITIES.map(d => {
                  const active = profile.deities.includes(d.id);
                  return (
                    <button key={d.id} onClick={() => toggleDeity(d.id)} style={{
                      padding: "12px 10px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                      border: `1.5px solid ${active ? T.gold : T.line}`,
                      background: active ? T.goldPale : T.ivory,
                      fontSize: 13.5, fontWeight: 600, color: active ? "#7A5C0E" : T.ink
                    }}>
                      {active && <Check size={13} style={{ marginRight: 4, verticalAlign: -2 }} color="#7A5C0E" />}
                      {d.label}
                    </button>
                  );
                })}
              </div>
              <PrimaryBtn full style={{ marginTop: 18 }} onClick={next} disabled={!profile.deities.length}>Continue <ArrowRight size={15} /></PrimaryBtn>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={S.h3}>Home city & gotra</h3>
              <p style={S.p}>Gotra is optional — used when your pandit chants your sankalp.</p>
              <input style={S.input} placeholder="Home city (e.g. Thane)" value={profile.city}
                onChange={e => setProfile({ ...profile, city: e.target.value })} />
              <input style={{ ...S.input, marginTop: 10 }} placeholder="Gotra (optional)" value={profile.gotra}
                onChange={e => setProfile({ ...profile, gotra: e.target.value })} />
              <PrimaryBtn full style={{ marginTop: 18 }} onClick={next}>Continue <ArrowRight size={15} /></PrimaryBtn>
            </div>
          )}

          {step === 5 && (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.goldPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Sparkles size={28} color={T.gold} />
              </div>
              <h3 style={S.h3}>Building your spiritual calendar…</h3>
              <p style={S.p}>Generating your kundali and personalised festival calendar based on what you've shared.</p>
              <PrimaryBtn full style={{ marginTop: 18 }} onClick={() => onComplete(profile)}>Enter Dashboard <ArrowRight size={15} /></PrimaryBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const S = {
  h3: { fontFamily: "Georgia, serif", fontSize: 19, fontWeight: 700, color: T.ink, margin: "0 0 6px" },
  p: { fontSize: 13, color: T.slate, margin: "0 0 4px", lineHeight: 1.5 },
  input: {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.line}`,
    fontSize: 14.5, color: T.ink, outline: "none", boxSizing: "border-box", background: T.paper
  },
};

/* ============================================================================
   PAGE: DASHBOARD
============================================================================ */
function Dashboard({ profile, go, cartCount }) {
  const primaryDeity = profile.deities[0] || "Ganesh";
  const fest = FESTIVALS_BY_DEITY[primaryDeity];
  const kitProduct = PRODUCTS.find(p => p.id === fest.kit);
  const recommended = PRODUCTS.filter(p => p.deity.includes(primaryDeity)).slice(0, 4);
  const matchedContent = CONTENT.filter(c => c.tag === primaryDeity || c.tag === "General").slice(0, 2);

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ background: `linear-gradient(135deg, ${T.maroonDeep}, ${T.maroon})`, padding: "20px 18px 26px", borderRadius: "0 0 26px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: T.goldLight, fontSize: 12, fontWeight: 600 }}>Namaste,</div>
            <div style={{ color: T.ivory, fontSize: 21, fontWeight: 700, fontFamily: "Georgia, serif" }}>{profile.name || "Devotee"}</div>
          </div>
          <button onClick={() => go("profile")} style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: `1px solid ${T.goldLight}55`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <User size={18} color={T.ivory} />
          </button>
        </div>

        <ArchCard style={{ marginTop: 18, padding: 16, background: "rgba(255,255,255,0.97)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Calendar size={14} color={T.gold} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: 1 }}>UPCOMING IN YOUR CALENDAR</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, fontFamily: "Georgia, serif" }}>{fest.name}</div>
              <div style={{ fontSize: 12.5, color: T.slate, marginTop: 2 }}>In {fest.days} days · personalised to {primaryDeity}</div>
            </div>
            <Pill tone="gold">{fest.days}d</Pill>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <PrimaryBtn style={{ flex: 1, fontSize: 12.5, padding: "9px 10px" }} onClick={() => go("product", kitProduct)}>
              Get the kit · ₹{kitProduct.price}
            </PrimaryBtn>
            <GhostBtn style={{ flex: 1, fontSize: 12.5, padding: "9px 10px" }} onClick={() => go("rituals")}>
              Book a puja
            </GhostBtn>
          </div>
        </ArchCard>
      </div>

      <div style={{ padding: "20px 18px 0" }}>
        <SectionLabel icon={Sparkles}>Recommended for your {primaryDeity} practice</SectionLabel>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6 }}>
          {recommended.length ? recommended.map(p => <ProductCard key={p.id} p={p} go={go} compact />) :
            PRODUCTS.slice(0,3).map(p => <ProductCard key={p.id} p={p} go={go} compact />)}
        </div>
      </div>

      <div style={{ padding: "22px 18px 0" }}>
        <SectionLabel icon={Star}>Your guidance, today</SectionLabel>
        <ArchCard style={{ padding: 16 }} onClick={() => go("astrology")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>Tomorrow is auspicious for {primaryDeity} puja</div>
              <div style={{ fontSize: 12, color: T.slate, marginTop: 3 }}>Based on your kundali's current dasha period</div>
            </div>
            <ChevronRight size={18} color={T.gold} />
          </div>
        </ArchCard>
      </div>

      <div style={{ padding: "22px 18px 0" }}>
        <SectionLabel icon={PlayCircle}>Watch & learn</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {matchedContent.map(c => <ContentRow key={c.id} c={c} go={go} />)}
        </div>
      </div>

      <div style={{ padding: "22px 18px 0" }}>
        <SectionLabel icon={MapPin}>A journey worth planning</SectionLabel>
        <ArchCard style={{ padding: 0, overflow: "hidden" }} onClick={() => go("pilgrimage")}>
          <div style={{ height: 90, background: `linear-gradient(135deg, ${T.maroon}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>🛕</div>
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>Jyotirlinga Darshan, Maharashtra</div>
            <div style={{ fontSize: 12, color: T.slate, marginTop: 3 }}>4 days · departs from Mumbai, Thane · from ₹9,200</div>
          </div>
        </ArchCard>
      </div>
    </div>
  );
}

function ProductCard({ p, go, compact }) {
  return (
    <ArchCard style={{ minWidth: compact ? 148 : "100%", padding: 12, flexShrink: 0 }} onClick={() => go("product", p)}>
      <div style={{ height: 84, background: T.paper, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
        <ProductGlyph type={p.img} size={70} />
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink, lineHeight: 1.3, minHeight: 32 }}>{p.name}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: T.maroon }}>₹{p.price}</span>
        <Pill tone="maroon" style={{ fontSize: 9.5, padding: "2px 7px" }}>{p.cat}</Pill>
      </div>
    </ArchCard>
  );
}

function ContentRow({ c, go }) {
  return (
    <ArchCard style={{ padding: 12, display: "flex", gap: 12, alignItems: "center" }} onClick={() => go("content")}>
      <div style={{ width: 52, height: 52, borderRadius: 10, background: `linear-gradient(135deg, ${T.maroon}, ${T.maroonSoft})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <PlayCircle size={20} color={T.ivory} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, lineHeight: 1.3 }}>{c.title}</div>
        <div style={{ fontSize: 11, color: T.slate, marginTop: 3 }}>{c.type} · {c.dur}</div>
      </div>
      <ChevronRight size={16} color={T.slate} />
    </ArchCard>
  );
}

/* ============================================================================
   PAGE: STORE
============================================================================ */
function Store({ go, cart, addToCart }) {
  const [cat, setCat] = useState("All");
  const cats = ["All", "Idols", "Kits", "Brass", "Havan", "Fragrance", "Pooja Samagri"];
  const filtered = cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Pilgrimaide Store" right={
        <button onClick={() => go("cart")} style={{ position: "relative", background: T.ivory, border: `1px solid ${T.line}`, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ShoppingBag size={17} color={T.ink} />
          {cart.length > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: T.maroon, color: T.ivory, fontSize: 9.5, fontWeight: 700, borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>{cart.length}</span>}
        </button>
      } />

      <div style={{ padding: "0 18px" }}>
        <ArchCard style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, borderRadius: 12 }}>
          <Search size={16} color={T.slate} />
          <span style={{ fontSize: 13, color: T.slate }}>Search 3,500+ products…</span>
        </ArchCard>

        <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "14px 0 6px", paddingBottom: 4 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "7px 14px", borderRadius: 999, border: `1.5px solid ${cat === c ? T.maroon : T.line}`,
              background: cat === c ? T.maroon : T.ivory, color: cat === c ? T.ivory : T.ink,
              fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0
            }}>{c}</button>
          ))}
        </div>

        {/* subscription banner */}
        <div style={{ display: "flex", gap: 10, margin: "14px 0", overflowX: "auto" }}>
          {KITS.map(k => (
            <div key={k.id} onClick={() => go("membership")} style={{
              minWidth: 220, flexShrink: 0, borderRadius: 14, padding: 14, cursor: "pointer",
              background: k.featured ? `linear-gradient(135deg, ${T.maroonDeep}, ${T.maroon})` : T.goldPale,
              border: k.featured ? "none" : `1px solid ${T.line}`
            }}>
              <Pill tone={k.featured ? "gold" : "maroon"} style={{ marginBottom: 8 }}>{k.tag}</Pill>
              <div style={{ fontSize: 15, fontWeight: 700, color: k.featured ? T.ivory : T.ink, fontFamily: "Georgia, serif" }}>{k.name}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: k.featured ? T.goldLight : T.maroon, marginTop: 4 }}>₹{k.price}<span style={{ fontSize: 11, fontWeight: 500 }}>{k.period}</span></div>
              <div style={{ fontSize: 11, color: k.featured ? "#F0DCC4" : T.slate, marginTop: 6, lineHeight: 1.4 }}>{k.items}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
          {filtered.map(p => <ProductCard key={p.id} p={p} go={go} />)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   PAGE: PRODUCT DETAIL
============================================================================ */
function ProductDetail({ product, go, addToCart, profile }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;
  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  return (
    <div style={{ paddingBottom: 100 }}>
      <TopBar title="Product" onBack={() => go("store")} />
      <div style={{ padding: "0 18px" }}>
        <div style={{ height: 220, background: T.paper, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.line}` }}>
          <ProductGlyph type={product.img} size={180} />
        </div>

        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <Pill tone="maroon">{product.cat}</Pill>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, fontWeight: 700, color: T.ink, margin: "8px 0 4px", lineHeight: 1.25 }}>{product.name}</h2>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}><Heart size={20} color={T.maroon} /></button>
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: T.maroon, marginTop: 4 }}>₹{product.price}</div>
        <p style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.6, marginTop: 10 }}>{product.desc}</p>

        {profile?.deities?.some(d => product.deity.includes(d)) && (
          <ArchCard style={{ padding: 12, marginTop: 14, background: T.goldPale, border: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={15} color="#7A5C0E" />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#7A5C0E" }}>Matches your {product.deity.find(d => profile.deities.includes(d))} devotion profile</span>
            </div>
          </ArchCard>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>Quantity</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12, border: `1.5px solid ${T.line}`, borderRadius: 10, padding: "4px 10px" }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", cursor: "pointer" }}><Minus size={14} color={T.ink} /></button>
            <span style={{ fontSize: 14, fontWeight: 700, width: 18, textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", cursor: "pointer" }}><Plus size={14} color={T.ink} /></button>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <SectionLabel>You may also need</SectionLabel>
            <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
              {related.map(p => <ProductCard key={p.id} p={p} go={go} compact />)}
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 480, margin: "0 auto", background: T.ivory, borderTop: `1px solid ${T.line}`, padding: 14, display: "flex", gap: 10 }}>
        <PrimaryBtn full onClick={() => { addToCart(product, qty); go("cart"); }}>
          Add to cart · ₹{product.price * qty}
        </PrimaryBtn>
      </div>
    </div>
  );
}

/* ============================================================================
   PAGE: CART
============================================================================ */
function Cart({ cart, go, removeFromCart, profile }) {
  const total = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  return (
    <div style={{ paddingBottom: 100 }}>
      <TopBar title="Your Cart" onBack={() => go("store")} />
      <div style={{ padding: "0 18px" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <ShoppingBag size={40} color={T.line} />
            <p style={{ color: T.slate, marginTop: 10, fontSize: 13.5 }}>Your cart is empty. Browse the store to find ritual essentials.</p>
            <PrimaryBtn style={{ marginTop: 16 }} onClick={() => go("store")}>Browse store</PrimaryBtn>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              {cart.map((c, i) => (
                <ArchCard key={i} style={{ padding: 12, display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 54, height: 54, borderRadius: 10, background: T.paper, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ProductGlyph type={c.product.img} size={44} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink, lineHeight: 1.3 }}>{c.product.name}</div>
                    <div style={{ fontSize: 12, color: T.slate, marginTop: 3 }}>Qty {c.qty} · ₹{c.product.price} each</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: T.maroon }}>₹{c.product.price * c.qty}</span>
                    <button onClick={() => removeFromCart(i)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={15} color={T.slate} /></button>
                  </div>
                </ArchCard>
              ))}
            </div>

            {profile?.upcomingPuja && (
              <ArchCard style={{ padding: 12, marginTop: 14, background: T.goldPale, border: "none" }}>
                <div style={{ fontSize: 12.5, color: "#7A5C0E", fontWeight: 600 }}>
                  💡 You have a {profile.upcomingPuja} booked. Add matching samagri kit?
                </div>
              </ArchCard>
            )}

            <ArchCard style={{ padding: 16, marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.slate, marginBottom: 6 }}>
                <span>Subtotal</span><span>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.slate, marginBottom: 10 }}>
                <span>Delivery</span><span style={{ color: T.good, fontWeight: 600 }}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: T.ink, paddingTop: 10, borderTop: `1px dashed ${T.line}` }}>
                <span>Total</span><span>₹{total}</span>
              </div>
            </ArchCard>
            <PrimaryBtn full style={{ marginTop: 14 }} onClick={() => go("checkout-success")}>Proceed to checkout <ArrowRight size={15} /></PrimaryBtn>
          </>
        )}
      </div>
    </div>
  );
}

function CheckoutSuccess({ go }) {
  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", background: T.goldPale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <Check size={32} color="#7A5C0E" />
      </div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: T.ink, margin: "0 0 8px" }}>Order confirmed</h2>
      <p style={{ fontSize: 13.5, color: T.slate, maxWidth: 280, lineHeight: 1.6 }}>A confirmation has been sent to your phone. Your order will be delivered within 4–6 days.</p>
      <PrimaryBtn style={{ marginTop: 22 }} onClick={() => go("dashboard")}>Back to dashboard</PrimaryBtn>
    </div>
  );
}

/* ============================================================================
   PAGE: RITUAL SERVICES (Puja Booking)
============================================================================ */
function Rituals({ go, profile, bookPuja }) {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState(null);
  const [mode, setMode] = useState("inperson");
  const [pandit, setPandit] = useState(null);
  const occasions = ["Satyanarayan Katha", "Griha Pravesh", "Ganesh Puja", "Navchandi", "Rudrabhishek", "Mundan", "Naamkaran"];

  if (step === 3) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: T.goldPale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <Flame size={30} color="#7A5C0E" />
        </div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: T.ink, margin: "0 0 8px" }}>Puja booked</h2>
        <p style={{ fontSize: 13.5, color: T.slate, maxWidth: 290, lineHeight: 1.6 }}>
          {occasion} with {pandit?.name} is confirmed. Sankalp will be taken in the name of <b>{profile.name || "Devotee"}</b>{profile.gotra ? `, ${profile.gotra} gotra.` : "."}
        </p>
        <ArchCard style={{ padding: 14, marginTop: 16, width: "100%", maxWidth: 320, textAlign: "left" }} onClick={() => go("product", PRODUCTS.find(p=>p.id==="p8"))}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Add matching samagri kit?</div>
            <ChevronRight size={16} color={T.gold} />
          </div>
        </ArchCard>
        <PrimaryBtn style={{ marginTop: 18 }} onClick={() => { bookPuja(occasion); go("dashboard"); }}>Back to dashboard</PrimaryBtn>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Book a Puja" onBack={step > 0 ? () => setStep(s => s - 1) : () => go("dashboard")} />
      <div style={{ padding: "0 18px" }}>
        {step === 0 && (
          <>
            <SectionLabel icon={Flame}>Select occasion</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {occasions.map(o => (
                <ArchCard key={o} style={{ padding: 14 }} onClick={() => { setOccasion(o); setStep(1); }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{o}</span>
                    <ChevronRight size={16} color={T.slate} />
                  </div>
                </ArchCard>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <SectionLabel icon={Calendar}>Mode & timing — {occasion}</SectionLabel>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              {[["inperson", "In Person"], ["livestream", "Livestream"]].map(([id, label]) => (
                <button key={id} onClick={() => setMode(id)} style={{
                  flex: 1, padding: "12px 0", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700,
                  border: `1.5px solid ${mode === id ? T.maroon : T.line}`,
                  background: mode === id ? T.maroon : T.ivory, color: mode === id ? T.ivory : T.ink
                }}>{label}</button>
              ))}
            </div>
            <ArchCard style={{ padding: 14, background: T.goldPale, border: "none", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={14} color="#7A5C0E" />
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#7A5C0E" }}>Tomorrow is muhurta-favourable, based on your kundali</span>
              </div>
            </ArchCard>
            <PrimaryBtn full onClick={() => setStep(2)}>Continue to pandit selection <ArrowRight size={15} /></PrimaryBtn>
          </>
        )}

        {step === 2 && (
          <>
            <SectionLabel icon={User}>Choose your pandit — {profile.city || "Thane"}</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PANDITS.map(p => (
                <ArchCard key={p.id} style={{ padding: 14 }} onClick={() => { setPandit(p); }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, ${T.maroon}, ${T.maroonSoft})`, display: "flex", alignItems: "center", justifyContent: "center", color: T.ivory, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                      {p.name.split(" ")[1]?.[0] || "P"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{p.name}</div>
                      <div style={{ fontSize: 11.5, color: T.slate, marginTop: 2 }}>{p.spec} · {p.years} yrs experience</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                        <Star size={11} color={T.gold} fill={T.gold} />
                        <span style={{ fontSize: 11.5, fontWeight: 600, color: T.ink }}>{p.rating}</span>
                        <span style={{ fontSize: 11, color: T.slate }}>· {p.lang}</span>
                      </div>
                    </div>
                    {pandit?.id === p.id && <Check size={18} color={T.gold} />}
                  </div>
                </ArchCard>
              ))}
            </div>
            <PrimaryBtn full style={{ marginTop: 16 }} onClick={() => pandit && setStep(3)}>
              Confirm booking · ₹{mode === "livestream" ? "1,400" : "2,100"} <ArrowRight size={15} />
            </PrimaryBtn>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   PAGE: PILGRIMAGE DISCOVERY
============================================================================ */
function Pilgrimage({ go, profile }) {
  const [tab, setTab] = useState("temples");
  const primaryDeity = profile.deities[0];
  const sortedTemples = useMemo(() => {
    if (!primaryDeity) return TEMPLES;
    return [...TEMPLES].sort((a, b) => (b.deity === primaryDeity) - (a.deity === primaryDeity));
  }, [primaryDeity]);

  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Pilgrimage" onBack={() => go("dashboard")} />
      <div style={{ padding: "0 18px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[["temples", "Temples"], ["packages", "Packages"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700,
              border: `1.5px solid ${tab === id ? T.maroon : T.line}`,
              background: tab === id ? T.maroon : T.ivory, color: tab === id ? T.ivory : T.ink
            }}>{label}</button>
          ))}
        </div>

        {primaryDeity && tab === "temples" && (
          <div style={{ fontSize: 11.5, color: T.slate, marginBottom: 12, fontStyle: "italic" }}>
            Sorted for your {primaryDeity} devotion
          </div>
        )}

        {tab === "temples" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sortedTemples.map(t => (
              <ArchCard key={t.id} style={{ padding: 0, overflow: "hidden" }} onClick={() => go("temple-detail", t)}>
                <div style={{ height: 70, background: `linear-gradient(135deg, ${T.maroon}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🛕</div>
                <div style={{ padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>{t.name}</div>
                      <div style={{ fontSize: 11.5, color: T.slate, marginTop: 2 }}>{t.city}</div>
                    </div>
                    <Pill tone={t.deity === primaryDeity ? "gold" : "maroon"}>{t.tag}</Pill>
                  </div>
                </div>
              </ArchCard>
            ))}
          </div>
        )}

        {tab === "packages" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PACKAGES.map(p => (
              <ArchCard key={p.id} style={{ padding: 14 }} onClick={() => go("package-detail", p)}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink, fontFamily: "Georgia, serif" }}>{p.title}</div>
                <div style={{ fontSize: 12, color: T.slate, marginTop: 4 }}>{p.temples}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <Pill tone="maroon">{p.days} days · {p.dep}</Pill>
                  <span style={{ fontSize: 15, fontWeight: 700, color: T.maroon }}>{p.from}</span>
                </div>
              </ArchCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TempleDetail({ temple, go }) {
  if (!temple) return null;
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Temple" onBack={() => go("pilgrimage")} />
      <div style={{ padding: "0 18px" }}>
        <div style={{ height: 160, borderRadius: 16, background: `linear-gradient(135deg, ${T.maroon}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>🛕</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: T.ink, margin: "16px 0 4px" }}>{temple.name}</h2>
        <div style={{ fontSize: 13, color: T.slate, marginBottom: 10 }}>{temple.city}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <Pill tone="gold">{temple.tag}</Pill>
          <Pill tone="maroon">Deity: {temple.deity}</Pill>
        </div>
        <p style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.6 }}>{temple.desc}</p>
        <ArchCard style={{ padding: 14, marginTop: 18 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink, marginBottom: 8 }}>Plan your visit</div>
          <div style={{ fontSize: 12, color: T.slate, lineHeight: 1.7 }}>
            Best time: Early morning darshan, 5:30–7:00 AM<br />
            Dress code: Traditional attire recommended<br />
            Nearby: Other temples in the same circuit available in Packages
          </div>
        </ArchCard>
        <PrimaryBtn full style={{ marginTop: 16 }} onClick={() => go("pilgrimage")}>See related packages</PrimaryBtn>
      </div>
    </div>
  );
}

function PackageDetail({ pkg, go }) {
  const [submitted, setSubmitted] = useState(false);
  if (!pkg) return null;
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Package" onBack={() => go("pilgrimage")} />
      <div style={{ padding: "0 18px" }}>
        <div style={{ height: 150, borderRadius: 16, background: `linear-gradient(135deg, ${T.maroonDeep}, ${T.maroon})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>🚐🛕</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: T.ink, margin: "16px 0 4px" }}>{pkg.title}</h2>
        <div style={{ fontSize: 13, color: T.slate, marginBottom: 10 }}>{pkg.temples}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <Pill tone="maroon">{pkg.days} days</Pill>
          <Pill tone="gold">From {pkg.dep}</Pill>
        </div>
        <ArchCard style={{ padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink, marginBottom: 8 }}>Includes</div>
          <div style={{ fontSize: 12.5, color: T.slate, lineHeight: 1.9 }}>
            ✓ Accommodation (3-star or equivalent)<br />
            ✓ AC transport between sites<br />
            ✓ Priest-guided darshan sequence<br />
            ✓ Daily breakfast
          </div>
        </ArchCard>
        <div style={{ fontSize: 24, fontWeight: 700, color: T.maroon, marginTop: 16 }}>{pkg.from} <span style={{ fontSize: 12, fontWeight: 500, color: T.slate }}>per person</span></div>

        {!submitted ? (
          <PrimaryBtn full style={{ marginTop: 16 }} onClick={() => setSubmitted(true)}>Enquire now</PrimaryBtn>
        ) : (
          <ArchCard style={{ padding: 16, marginTop: 16, background: T.goldPale, border: "none", textAlign: "center" }}>
            <Check size={22} color="#7A5C0E" />
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7A5C0E", marginTop: 6 }}>Enquiry received. Our travel desk will call you within 24 hours.</div>
          </ArchCard>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   PAGE: ASTROLOGY
============================================================================ */
function Astrology({ go, profile }) {
  const primaryDeity = profile.deities[0] || "Ganesh";
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Your Guidance" onBack={() => go("dashboard")} />
      <div style={{ padding: "0 18px" }}>
        <ArchCard style={{ padding: 18, background: `linear-gradient(135deg, ${T.maroonDeep}, ${T.maroon})`, border: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, color: T.goldLight, fontWeight: 700, letterSpacing: 1 }}>YOUR KUNDALI</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: T.ivory, fontFamily: "Georgia, serif", marginTop: 4 }}>
                {profile.name || "Devotee"}
              </div>
              <div style={{ fontSize: 12, color: "#F0DCC4", marginTop: 2 }}>{profile.dob || "Birth date not set"} · {profile.city || "—"}</div>
            </div>
            <Star size={26} color={T.goldLight} fill={T.goldLight} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
            {[["Lagna", "Vrishabha"], ["Rashi", "Mesha"], ["Nakshatra", "Rohini"]].map(([k, v]) => (
              <div key={k} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 9.5, color: "#F0DCC4" }}>{k}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ivory, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </ArchCard>

        <div style={{ marginTop: 20 }}>
          <SectionLabel icon={Sparkles}>Personalised recommendations</SectionLabel>
          <ArchCard style={{ padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>Current dasha: Guru (Jupiter)</div>
            <div style={{ fontSize: 12, color: T.slate, marginTop: 4, lineHeight: 1.5 }}>A favourable period for {primaryDeity} worship and new beginnings. Consider a Guru puja this month.</div>
          </ArchCard>
          <ArchCard style={{ padding: 14, marginBottom: 10 }} onClick={() => go("product", PRODUCTS.find(p => p.cat === "Idols"))}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>Recommended gemstone: Yellow Sapphire</div>
                <div style={{ fontSize: 12, color: T.slate, marginTop: 4 }}>Strengthens Jupiter in your current chart</div>
              </div>
              <ChevronRight size={16} color={T.gold} />
            </div>
          </ArchCard>
          <ArchCard style={{ padding: 14 }} onClick={() => go("rituals")}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>Muhurta alert: tomorrow, 6–8 AM</div>
                <div style={{ fontSize: 12, color: T.slate, marginTop: 4 }}>Auspicious window for {primaryDeity} puja</div>
              </div>
              <ChevronRight size={16} color={T.gold} />
            </div>
          </ArchCard>
        </div>

        <div style={{ marginTop: 20 }}>
          <SectionLabel icon={Sparkles}>Vastu & Dosha Remedies</SectionLabel>
          <ArchCard style={{ padding: 14 }} onClick={() => go("vastu")}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>Check your home Vastu & doshas</span>
                  <Pill tone="maroon" style={{ fontSize: 9.5, padding: "2px 7px" }}>Phase 2</Pill>
                </div>
                <div style={{ fontSize: 12, color: T.slate, marginTop: 4 }}>Manglik, Kaal Sarp, Sade Sati checks + room-by-room Vastu remedies</div>
              </div>
              <ChevronRight size={16} color={T.gold} />
            </div>
          </ArchCard>
        </div>

        <div style={{ marginTop: 20 }}>
          <SectionLabel icon={User}>Talk to an astrologer</SectionLabel>
          <ArchCard style={{ padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.goldPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Star size={18} color={T.gold} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>30-min Vedic consultation</div>
              <div style={{ fontSize: 11.5, color: T.slate, marginTop: 2 }}>Verified panel · ₹499 onwards</div>
            </div>
            <GhostBtn style={{ padding: "8px 14px", fontSize: 12 }}>Book</GhostBtn>
          </ArchCard>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   PAGE: VASTU, DOSHA & REMEDIES (Phase 2 — roadmap preview)
   Shown as a working teaser inside the MVP: demonstrates the model to
   investors without committing full engineering scope before Series A.
============================================================================ */
function VastuDosha({ go, profile }) {
  const [checked, setChecked] = useState(false);
  const doshas = [
    { name: "Manglik Dosha", status: "Not present", tone: "good" },
    { name: "Kaal Sarp Dosha", status: "Mild — review recommended", tone: "gold" },
    { name: "Sade Sati", status: "Not active", tone: "good" },
  ];
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Vastu & Remedies" onBack={() => go("astrology")} />
      <div style={{ padding: "0 18px" }}>
        <ArchCard style={{ padding: 14, background: T.goldPale, border: "none", display: "flex", gap: 10, alignItems: "center" }}>
          <Lock size={16} color="#7A5C0E" />
          <div style={{ fontSize: 12, color: "#7A5C0E", fontWeight: 600, lineHeight: 1.5 }}>
            Phase 2 module — shown here as a product preview. Full dosha engine and certified Vastu consultant network ship post Series A.
          </div>
        </ArchCard>

        <div style={{ marginTop: 18 }}>
          <SectionLabel icon={AlertTriangle}>Dosha check, from your kundali</SectionLabel>
          {!checked ? (
            <ArchCard style={{ padding: 16, textAlign: "center" }}>
              <p style={{ fontSize: 12.5, color: T.slate, marginBottom: 14 }}>Run a dosha scan using the birth data already on your profile.</p>
              <PrimaryBtn onClick={() => setChecked(true)}>Run dosha check</PrimaryBtn>
            </ArchCard>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {doshas.map(d => (
                <ArchCard key={d.name} style={{ padding: 13, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{d.name}</span>
                  <Pill tone={d.tone}>{d.status}</Pill>
                </ArchCard>
              ))}
              <ArchCard style={{ padding: 14, marginTop: 4 }} onClick={() => go("rituals")}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Suggested remedy: Kaal Sarp Shanti Puja</div>
                <div style={{ fontSize: 11.5, color: T.slate, marginTop: 4 }}>Best performed at a Shiva temple. Tap to book a pandit-led remedy ritual.</div>
              </ArchCard>
            </div>
          )}
        </div>

        <div style={{ marginTop: 22 }}>
          <SectionLabel icon={Compass}>Home Vastu, room by room</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["Pooja Room", "Northeast corner ideal. Avoid placing under a staircase."],
              ["Kitchen", "Southeast is most favourable for the cooking platform."],
              ["Main Entrance", "North or East-facing doors are considered most auspicious."],
            ].map(([room, tip]) => (
              <ArchCard key={room} style={{ padding: 13 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{room}</div>
                <div style={{ fontSize: 11.5, color: T.slate, marginTop: 3 }}>{tip}</div>
              </ArchCard>
            ))}
          </div>
          <GhostBtn full style={{ width: "100%", marginTop: 10 }} onClick={() => go("membership")}>
            Full room-by-room Vastu audit — Siddhi members
          </GhostBtn>
        </div>
      </div>
    </div>
  );
}


function ContentHub({ go, profile }) {
  const primaryDeity = profile.deities[0];
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Content" onBack={() => go("dashboard")} />
      <div style={{ padding: "0 18px" }}>
        {primaryDeity && (
          <div style={{ fontSize: 11.5, color: T.slate, marginBottom: 12, fontStyle: "italic" }}>
            Curated for your {primaryDeity} devotion
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CONTENT.map(c => (
            <ArchCard key={c.id} style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 110, background: `linear-gradient(135deg, ${T.maroon}, ${T.maroonSoft})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <PlayCircle size={36} color={T.ivory} />
                <span style={{ position: "absolute", bottom: 8, right: 10, fontSize: 10.5, color: T.ivory, background: "rgba(0,0,0,0.35)", padding: "2px 8px", borderRadius: 6 }}>{c.dur}</span>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, lineHeight: 1.3 }}>{c.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                  <span style={{ fontSize: 11.5, color: T.slate }}>{c.type}</span>
                  <Pill tone={c.tag === primaryDeity ? "gold" : "maroon"}>{c.tag}</Pill>
                </div>
                {c.type === "Pilgrimage Guide" && (
                  <GhostBtn style={{ width: "100%", marginTop: 10, fontSize: 12, padding: "8px 0" }} onClick={() => go("pilgrimage")}>
                    Explore this temple <ChevronRight size={13} />
                  </GhostBtn>
                )}
                {c.type === "Festival Significance" && (
                  <GhostBtn style={{ width: "100%", marginTop: 10, fontSize: 12, padding: "8px 0" }} onClick={() => go("store")}>
                    Shop the festival kit <ChevronRight size={13} />
                  </GhostBtn>
                )}
              </div>
            </ArchCard>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   PAGE: MEMBERSHIP
============================================================================ */
function Membership({ go, profile, setTier }) {
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Membership" onBack={() => go("dashboard")} />
      <div style={{ padding: "0 18px" }}>
        <div style={{ textAlign: "center", padding: "10px 0 20px" }}>
          <Crown size={30} color={T.gold} />
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, color: T.ink, margin: "8px 0 4px" }}>Choose your practice tier</h2>
          <p style={{ fontSize: 12.5, color: T.slate }}>Membership turns a single purchase into a monthly spiritual rhythm.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <ArchCard style={{ padding: 18 }}>
            <Pill tone="maroon">Free</Pill>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, marginTop: 8, fontFamily: "Georgia, serif" }}>Shraddha</div>
            <div style={{ fontSize: 12.5, color: T.slate, marginTop: 6, lineHeight: 1.7 }}>
              ✓ Festival calendar<br />✓ Basic temple discovery<br />✓ Limited content access
            </div>
            <GhostBtn full style={{ marginTop: 14, width: "100%" }} onClick={() => setTier("free")}>Current plan</GhostBtn>
          </ArchCard>

          <ArchCard style={{ padding: 18, border: `2px solid ${T.gold}`, position: "relative" }}>
            <div style={{ position: "absolute", top: -10, right: 16, background: T.gold, color: T.ivory, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>POPULAR</div>
            <Pill tone="gold">₹299/month</Pill>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, marginTop: 8, fontFamily: "Georgia, serif" }}>Sadhna</div>
            <div style={{ fontSize: 12.5, color: T.slate, marginTop: 6, lineHeight: 1.7 }}>
              ✓ Monthly ritual box<br />✓ Puja reminders<br />✓ One astrology report<br />✓ Full content library
            </div>
            <PrimaryBtn full style={{ marginTop: 14 }} onClick={() => setTier("sadhna")}>Subscribe</PrimaryBtn>
          </ArchCard>

          <ArchCard style={{ padding: 18, background: `linear-gradient(135deg, ${T.maroonDeep}, ${T.maroon})`, border: "none" }}>
            <Pill tone="gold">₹999/month</Pill>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.ivory, marginTop: 8, fontFamily: "Georgia, serif" }}>Siddhi</div>
            <div style={{ fontSize: 12.5, color: "#F0DCC4", marginTop: 6, lineHeight: 1.7 }}>
              ✓ Everything in Sadhna<br />✓ Discounted puja bookings<br />✓ Pilgrimage priority access<br />✓ Personalised ritual guidance
            </div>
            <PrimaryBtn full style={{ marginTop: 14, background: T.gold }} onClick={() => setTier("siddhi")}>Subscribe</PrimaryBtn>
          </ArchCard>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   PAGE: PROFILE
============================================================================ */
function Profile({ profile, go, tier }) {
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="My Profile" onBack={() => go("dashboard")} />
      <div style={{ padding: "0 18px" }}>
        <div style={{ textAlign: "center", padding: "10px 0 20px" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${T.maroon}, ${T.maroonSoft})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", color: T.ivory, fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif" }}>
            {(profile.name || "D")[0]}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, marginTop: 10, fontFamily: "Georgia, serif" }}>{profile.name || "Devotee"}</div>
          <div style={{ fontSize: 12.5, color: T.slate, marginTop: 2 }}>{profile.city || "City not set"}</div>
          <Pill tone="gold" style={{ marginTop: 8 }}>{tier === "siddhi" ? "Siddhi Member" : tier === "sadhna" ? "Sadhna Member" : "Shraddha (Free)"}</Pill>
        </div>

        <ArchCard style={{ padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: 1, marginBottom: 10 }}>SPIRITUAL IDENTITY</div>
          {[["Date of birth", profile.dob || "Not set"], ["Gotra", profile.gotra || "Not set"], ["Primary deity", profile.deities.join(", ") || "Not set"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.line}` }}>
              <span style={{ fontSize: 12.5, color: T.slate }}>{k}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>{v}</span>
            </div>
          ))}
        </ArchCard>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          {[["My orders", "store"], ["My puja bookings", "rituals"], ["My membership", "membership"], ["Saved temples", "pilgrimage"]].map(([label, dest]) => (
            <ArchCard key={label} style={{ padding: 14 }} onClick={() => go(dest)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>{label}</span>
                <ChevronRight size={16} color={T.slate} />
              </div>
            </ArchCard>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   ROOT APP — internal router, shared state (the "flywheel" lives here)
============================================================================ */
export default function PilgrimaideApp() {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState({ phone: "", name: "", dob: "", city: "", deities: [], gotra: "" });
  const [page, setPage] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [tier, setTier] = useState("free");
  const [history, setHistory] = useState([]);

  const go = (p, payload) => {
    setHistory(h => [...h, page]);
    setSelected(payload || null);
    setPage(p);
    window.scrollTo?.(0, 0);
  };

  const addToCart = (product, qty) => setCart(c => [...c, { product, qty }]);
  const removeFromCart = (idx) => setCart(c => c.filter((_, i) => i !== idx));
  const bookPuja = (occasion) => setProfile(p => ({ ...p, upcomingPuja: occasion }));

  if (!onboarded) {
    return <Onboarding onComplete={(p) => { setProfile(p); setOnboarded(true); }} />;
  }

  const bottomNavPages = ["dashboard", "store", "rituals", "pilgrimage", "astrology"];

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: T.paper,
      boxShadow: "0 0 40px rgba(0,0,0,0.06)", position: "relative"
    }}>
      {page === "dashboard" && <Dashboard profile={profile} go={go} cartCount={cart.length} />}
      {page === "store" && <Store go={go} cart={cart} addToCart={addToCart} />}
      {page === "product" && <ProductDetail product={selected} go={go} addToCart={addToCart} profile={profile} />}
      {page === "cart" && <Cart cart={cart} go={go} removeFromCart={removeFromCart} profile={profile} />}
      {page === "checkout-success" && <CheckoutSuccess go={(p) => { setCart([]); go(p); }} />}
      {page === "rituals" && <Rituals go={go} profile={profile} bookPuja={bookPuja} />}
      {page === "pilgrimage" && <Pilgrimage go={go} profile={profile} />}
      {page === "temple-detail" && <TempleDetail temple={selected} go={go} />}
      {page === "package-detail" && <PackageDetail pkg={selected} go={go} />}
      {page === "astrology" && <Astrology go={go} profile={profile} />}
      {page === "vastu" && <VastuDosha go={go} profile={profile} />}
      {page === "content" && <ContentHub go={go} profile={profile} />}
      {page === "membership" && <Membership go={go} profile={profile} setTier={(t) => { setTier(t); go("dashboard"); }} />}
      {page === "profile" && <Profile profile={profile} go={go} tier={tier} />}

      {bottomNavPages.includes(page) && <BottomNav page={page} go={go} />}
    </div>
  );
}
