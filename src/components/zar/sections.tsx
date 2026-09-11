import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import QRCode from "qrcode";
import { Heart, Leaf, MapPin, Phone, MessageCircle, Music2, Pause } from "lucide-react";
import type { ZarContact, ZarEvent, ZarGalleryItem, ZarInvitationContent } from "@/lib/zar/invitation";
import {
  FiligreeArch,
  FiligreeCorner,
  FiligreeDivider,
  FiligreeFrame,
  FiligreeVine,
} from "./filigree";

const has = (v?: string | null) => Boolean(v && String(v).trim());

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-xl px-6 py-16 ${className}`}>
      {children}
    </section>
  );
}

export function Rise({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold-deep/80">{children}</p>
  );
}

/* ── 1. Opening ─────────────────────────────────────────────── */
export function OpeningSection() {
  const reduce = useReducedMotion();
  return (
    <Section className="flex min-h-[92vh] flex-col items-center justify-center text-center">
      <svg viewBox="0 0 300 160" aria-hidden="true" className="absolute inset-x-6 top-10 text-gold-soft">
        <motion.circle
          cx="150"
          cy="80"
          r="1.6"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M40 120 C 90 118, 120 96, 150 80 C 182 62, 214 58, 262 66"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 3.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <Rise delay={0.8}>
        <h1 className="font-display text-[26px] font-light uppercase leading-[2.1] tracking-[0.34em] text-ink/85">
          Some
          <br />
          beautiful stories
          <br />
          are meant to be
          <br />
          celebrated
        </h1>
      </Rise>
      <FiligreeDivider delay={1.6} className="mt-8" />
      <Rise delay={2.2}>
        <p className="mt-14 font-sans text-[10px] uppercase tracking-[0.3em] text-ink-soft/70">
          Please scroll
          <br />
          to see our journey unfold
        </p>
      </Rise>
    </Section>
  );
}

/* ── 2 + 3. Forged hero ─────────────────────────────────────── */
export function HeroSection({ content }: { content: ZarInvitationContent }) {
  const groom = content.groom_name?.trim();
  const bride = content.bride_name?.trim();
  if (!has(groom) && !has(bride)) return null;

  return (
    <Section className="flex min-h-[96vh] flex-col items-center justify-center text-center">
      <FiligreeVine className="absolute left-0 top-10 h-[70%] w-10 opacity-70" />
      <FiligreeVine className="absolute right-0 top-10 h-[70%] w-10 opacity-70" mirrored />
      <FiligreeArch className="max-w-[320px]" />
      <FiligreeFrame className="w-full max-w-sm" delay={0.6}>
        {has(content.invocation) && (
          <Rise delay={0.4}>
            <p className="mb-8 font-display text-base italic text-gold-deep">{content.invocation}</p>
          </Rise>
        )}
        <div className="py-6">
          {has(groom) && (
            <Rise delay={1}>
              <p className="zar-gold-text break-words font-display text-[clamp(2rem,11vw,3.25rem)] font-light uppercase leading-tight tracking-[0.12em]">
                {groom}
              </p>
            </Rise>
          )}
          {has(groom) && has(bride) && (
            <Rise delay={1.3}>
              <p className="my-3 font-display text-3xl italic text-gold">&amp;</p>
            </Rise>
          )}
          {has(bride) && (
            <Rise delay={1.5}>
              <p className="zar-gold-text break-words font-display text-[clamp(2rem,11vw,3.25rem)] font-light uppercase leading-tight tracking-[0.12em]">
                {bride}
              </p>
            </Rise>
          )}
        </div>
        <FiligreeDivider delay={1.9} className="mx-auto" />
        <Rise delay={2.1}>
          <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.34em] text-ink-soft">
            Two hearts &middot; one beautiful journey
          </p>
        </Rise>
      </FiligreeFrame>
      <CoupleDetails content={content} />
    </Section>
  );
}

function CoupleDetails({ content }: { content: ZarInvitationContent }) {
  const cols = [
    {
      photo: content.groom_photo_url,
      name: content.groom_name,
      qualification: content.groom_qualification,
      occupation: content.groom_occupation,
    },
    {
      photo: content.bride_photo_url,
      name: content.bride_name,
      qualification: content.bride_qualification,
      occupation: content.bride_occupation,
    },
  ].filter((c) => has(c.photo) || has(c.qualification) || has(c.occupation));

  if (!cols.length) return null;

  return (
    <div className="mt-12 grid w-full max-w-sm grid-cols-1 gap-8 sm:grid-cols-2">
      {cols.map((c, i) => (
        <Rise key={i} delay={0.2 * i}>
          <div className="flex flex-col items-center gap-3 text-center">
            {has(c.photo) && (
              <div className="relative">
                <FiligreeCorner className="absolute -left-3 -top-3 h-8 w-8" delay={0.3} />
                <FiligreeCorner className="absolute -bottom-3 -right-3 h-8 w-8" delay={0.5} flipX flipY />
                <img
                  src={c.photo as string}
                  alt={c.name ?? ""}
                  loading="lazy"
                  className="h-28 w-28 rounded-full border border-gold/40 object-cover"
                />
              </div>
            )}
            {has(c.qualification) && (
              <p className="font-sans text-[11px] tracking-[0.16em] text-ink-soft">{c.qualification}</p>
            )}
            {has(c.occupation) && (
              <p className="font-sans text-[11px] tracking-[0.16em] text-ink-soft">{c.occupation}</p>
            )}
          </div>
        </Rise>
      ))}
    </div>
  );
}

/* ── 4. Date ────────────────────────────────────────────────── */
function formatDate(value?: string | null) {
  if (!has(value)) return null;
  const parsed = new Date(value as string);
  if (Number.isNaN(parsed.getTime())) return value as string;
  return parsed
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}

function weekday(value?: string | null) {
  if (!has(value)) return null;
  const parsed = new Date(value as string);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-GB", { weekday: "long" }).toUpperCase();
}

export function DateSection({ content }: { content: ZarInvitationContent }) {
  const date = formatDate(content.wedding_date);
  if (!date) return null;
  const day = weekday(content.wedding_date);
  return (
    <Section className="flex flex-col items-center text-center">
      <FiligreeArch className="max-w-[280px] opacity-80" />
      <Rise>
        <Eyebrow>Together forever</Eyebrow>
      </Rise>
      <FiligreeFrame className="mt-6 w-full max-w-xs" delay={0.3}>
        {day && <p className="font-sans text-[11px] tracking-[0.34em] text-ink-soft">{day}</p>}
        <p className="zar-gold-text mt-3 font-display text-[clamp(1.7rem,8vw,2.4rem)] tracking-[0.16em]">
          {date}
        </p>
      </FiligreeFrame>
      <FiligreeDivider delay={1} className="mt-8" />
      <Rise delay={0.6}>
        <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.36em] text-gold-deep/80">
          A new chapter begins
        </p>
      </Rise>
    </Section>
  );
}

/* ── 5. Invitation message + family ─────────────────────────── */
export function MessageSection({ content }: { content: ZarInvitationContent }) {
  const relatives = typeof content.relatives === "string" && has(content.relatives) ? [content.relatives] : [];
  const anything =
    has(content.groom_parents) ||
    has(content.bride_parents) ||
    relatives.length > 0;
  if (!anything) return null;

  return (
    <Section className="text-center">
      <FiligreeArch className="mx-auto max-w-[300px] opacity-70" />
      <Rise>
        <p className="font-display text-xl italic text-gold-deep">
          With the blessings of our families
        </p>
      </Rise>
      <FiligreeDivider delay={0.6} className="mx-auto mt-8" />
      {(has(content.groom_parents) || has(content.bride_parents)) && (
        <Rise delay={0.4}>
          <p className="mt-8 font-display text-lg italic text-gold-deep">
            Together with our parents
          </p>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {has(content.groom_parents) && (
              <p className="font-display text-base leading-relaxed text-ink">{content.groom_parents}</p>
            )}
            {has(content.bride_parents) && (
              <p className="font-display text-base leading-relaxed text-ink">{content.bride_parents}</p>
            )}
          </div>
        </Rise>
      )}
      {relatives.length > 0 && (
        <Rise delay={0.5}>
          <p className="mx-auto mt-8 max-w-sm font-sans text-[11px] leading-loose tracking-[0.14em] text-ink-soft">
            {relatives.join(" · ")}
          </p>
        </Rise>
      )}
    </Section>
  );
}

/* ── 6. Events ──────────────────────────────────────────────── */
export function EventsSection({ events }: { events: ZarEvent[] }) {
  const list = events.filter((e) => has(e.name ?? e.title ?? e.event_name) || has(e.date ?? e.event_date) || has(e.time ?? e.start_time));
  if (!list.length) return null;
  return (
    <Section className="text-center">
      <Rise>
        <h2 className="font-display text-3xl italic text-ink">Wedding Events</h2>
      </Rise>
      <FiligreeDivider delay={0.3} className="mx-auto mt-4" />
      <div className="mt-10 space-y-10">
        {list.map((e, i) => (
          <div key={i}>
            <Rise delay={0.05 * i}>
              <div className="flex flex-col items-center gap-2">
                <Leaf className="h-4 w-4 text-gold" aria-hidden="true" />
                <p className="font-display text-2xl text-ink">{e.name ?? e.title ?? e.event_name}</p>
                {has(e.date ?? e.event_date) && (
                  <p className="font-sans text-[11px] tracking-[0.22em] text-ink-soft">
                    {formatDate(e.date ?? e.event_date)}
                  </p>
                )}
                {has(e.time ?? e.start_time) && (
                  <p className="font-sans text-[11px] tracking-[0.22em] text-ink-soft">{e.time ?? e.start_time}</p>
                )}
                {has(e.venue ?? e.venue_name) && (
                  <p className="max-w-xs font-display text-base text-ink-soft">{e.venue ?? e.venue_name}</p>
                )}
                {has(e.note ?? e.description) && (
                  <p className="max-w-xs font-sans text-[11px] tracking-[0.14em] text-ink-soft/80">
                    {e.note ?? e.description}
                  </p>
                )}
              </div>
            </Rise>
            {i < list.length - 1 && <FiligreeDivider delay={0.2} className="mx-auto mt-8 opacity-80" />}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── 7. Venue ───────────────────────────────────────────────── */
export function VenueSection({ content }: { content: ZarInvitationContent }) {
  const anything =
    has(content.venue_name) || has(content.venue_address) || has(content.city) || has(content.venue_image_url);
  if (!anything) return null;
  const mapsUrl = has(content.maps_url) ? (content.maps_url as string) : null;

  return (
    <Section className="text-center">
      <Rise>
        <h2 className="font-display text-3xl italic text-ink">Venue</h2>
      </Rise>
      <FiligreeDivider delay={0.3} className="mx-auto mt-4" />
      <FiligreeFrame className="mt-8" delay={0.3}>
        {has(content.venue_image_url) && (
          <Rise>
            <img
              src={content.venue_image_url as string}
              alt={content.venue_name ?? "Venue"}
              loading="lazy"
              className="mb-6 h-48 w-full rounded-sm border border-gold/30 object-cover"
            />
          </Rise>
        )}
        {has(content.venue_name) && (
          <Rise delay={0.1}>
            <p className="font-display text-2xl leading-snug text-ink">{content.venue_name}</p>
          </Rise>
        )}
        {(has(content.venue_address) || has(content.city)) && (
          <Rise delay={0.2}>
            <p className="mt-3 font-sans text-[11px] leading-relaxed tracking-[0.16em] text-ink-soft">
          {[content.venue_address, content.city].filter(has).join(", ")}
            </p>
          </Rise>
        )}
        {mapsUrl && (
          <Rise delay={0.3}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="zar-plaque mt-6 inline-flex items-center gap-2 rounded-sm border border-gold/45 px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.24em] text-gold-deep transition-colors hover:border-gold"
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Get Directions
            </a>
          </Rise>
        )}
      </FiligreeFrame>
    </Section>
  );
}

/* ── 8. Gallery ─────────────────────────────────────────────── */
export function GallerySection({ gallery }: { gallery: Array<string | ZarGalleryItem> }) {
  const photos = (gallery ?? []).flatMap((item) => {
    if (typeof item === "string" && has(item)) return [item];
    if (item && typeof item === "object") {
      const src = item.url ?? item.src ?? item.image_url;
      if (has(src)) return [src as string];
    }
    return [];
  });
  if (!photos.length) return null;
  return (
    <Section className="text-center">
      <Rise>
        <h2 className="font-display text-3xl italic text-ink">Our Moments</h2>
        <Eyebrow>A glimpse of our journey</Eyebrow>
      </Rise>
      <FiligreeDivider delay={0.3} className="mx-auto mt-4" />
      <div className="mt-8 grid grid-cols-2 gap-3">
        {photos.map((src, i) => (
          <Rise key={src + i} delay={0.05 * i}>
            <div className={`relative ${i === 0 ? "col-span-2" : ""}`}>
              <FiligreeCorner className="absolute -left-1 -top-1 z-10 h-7 w-7" delay={0.2} />
              <FiligreeCorner className="absolute -bottom-1 -right-1 z-10 h-7 w-7" delay={0.3} flipX flipY />
              <img
                src={src}
                alt=""
                loading="lazy"
                className={`w-full rounded-sm border border-gold/30 object-cover ${i === 0 ? "h-56" : "h-32"}`}
              />
            </div>
          </Rise>
        ))}
      </div>
    </Section>
  );
}

/* ── 9. RSVP (animation only) ───────────────────────────────── */
export function RsvpSection() {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  return (
    <Section className="text-center">
      <FiligreeArch className="mx-auto max-w-[300px] opacity-70" />
      <Rise>
        <h2 className="font-display text-3xl italic text-ink">Will you be there?</h2>
      </Rise>
      <FiligreeDivider delay={0.3} className="mx-auto mt-4" />
      <div className="mx-auto mt-8 flex max-w-xs flex-col gap-4">
        {(
          [
            { key: "yes", label: "Will Be There", icon: Heart },
            { key: "no", label: "Regretfully Decline", icon: Leaf },
          ] as const
        ).map(({ key, label, icon: Icon }) => (
          <motion.button
            key={key}
            type="button"
            onClick={() => setChoice(key)}
            whileTap={{ scale: 0.97 }}
            aria-pressed={choice === key}
            className={`zar-plaque flex items-center justify-center gap-3 rounded-sm border px-6 py-3.5 font-display text-lg tracking-[0.08em] transition-colors ${
              choice === key ? "border-gold text-gold-deep" : "border-gold/40 text-ink"
            }`}
          >
            <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
            {label}
          </motion.button>
        ))}
      </div>
      <motion.div
        initial={false}
        animate={choice ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        className="overflow-hidden"
      >
        {choice && (
          <div className="mt-8">
            <FiligreeDivider delay={0} className="mx-auto" />
            <p className="mt-4 font-display text-lg italic text-gold-deep">
              {choice === "yes"
                ? "Your presence will make our day complete."
                : "You will be dearly missed, and warmly remembered."}
            </p>
          </div>
        )}
      </motion.div>
      <Rise delay={0.4}>
        <p className="mt-10 font-display text-base italic text-ink-soft">
          Your presence means the world to us
        </p>
      </Rise>
    </Section>
  );
}

/* ── 10. Closing composition ────────────────────────────────── */
export function ClosingSection({
  content,
  publicUrl,
}: {
  content: ZarInvitationContent;
  publicUrl?: string | null | undefined;
}) {
  const contacts = Array.isArray(content.contacts) ? content.contacts.filter((c) => c && typeof c === "object" && has(c.phone)).slice(0, 2) : [];
  return (
    <Section className="pb-28 text-center">
      <FiligreeArch className="mx-auto max-w-[320px]" />
      <Rise>
        <h2 className="font-display text-3xl uppercase tracking-[0.28em] text-ink">Thank you</h2>
        <p className="mt-2 font-display text-lg italic text-gold-deep">
          for being a part of our story
        </p>
      </Rise>
      <FiligreeDivider delay={0.4} className="mx-auto mt-6" />

      {contacts.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-4">
          {contacts.map((c, i) => (
            <ContactCard key={i} contact={c} delay={0.1 * i} />
          ))}
        </div>
      )}

      // QR omitted from invitation card per integration spec

      {(has(content.groom_name) || has(content.bride_name)) && (
        <Rise delay={0.3}>
          <p className="mt-12 font-display text-base italic text-ink-soft">Love</p>
          <p className="zar-gold-text font-display text-2xl tracking-[0.1em]">
            {[content.groom_name, content.bride_name].filter(has).join(" & ")}
          </p>
        </Rise>
      )}
    </Section>
  );
}

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "");
}

function ContactCard({ contact, delay }: { contact: ZarContact; delay: number }) {
  const phone = (contact.phone ?? "").trim();
  const whatsapp = has(contact.whatsapp_url)
    ? (contact.whatsapp_url as string)
    : `https://wa.me/${digitsOnly(phone)}`;
  return (
    <Rise delay={delay}>
      <div className="zar-plaque flex flex-col items-center gap-3 rounded-sm border border-gold/35 px-5 py-5">
        {has(contact.name) && <p className="font-display text-xl text-ink">{contact.name}</p>}
        <div className="flex gap-3">
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2 rounded-sm border border-gold/45 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.22em] text-gold-deep"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-gold/45 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.22em] text-gold-deep"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>
    </Rise>
  );
}

function QrPlaque({ url, label }: { url: string; label?: string | null | undefined }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url, { margin: 1, width: 320, color: { dark: "#6b5227", light: "#00000000" } })
      .then((v) => {
        if (active) setDataUrl(v);
      })
      .catch(() => {
        if (active) setDataUrl(null);
      });
    return () => {
      active = false;
    };
  }, [url]);

  if (!dataUrl) return null;

  return (
    <Rise delay={0.2}>
      <div className="mx-auto mt-10 w-fit">
        <FiligreeFrame delay={0.2} className="w-[190px]">
          <img src={dataUrl} alt={label ?? "Invitation QR code"} className="h-32 w-32 mx-auto" />
        </FiligreeFrame>
        <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.24em] text-ink-soft">
          {label ?? "Share this invitation"}
        </p>
      </div>
    </Rise>
  );
}

/* ── Music (optional, user-initiated) ───────────────────────── */
export function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        onClick={() => {
          const audio = audioRef.current;
          if (!audio) return;
          if (playing) {
            audio.pause();
            setPlaying(false);
          } else {
            void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
          }
        }}
        aria-label={playing ? "Pause music" : "Play music"}
        className="zar-plaque fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-gold/45 text-gold-deep"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
      </button>
    </>
  );
}
