import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { fetchInvitation, readSlug, type ZarPayload } from "@/lib/zar/invitation";
import fallbackMusic from "@/leberch-romantic-584475.mp3";
import { BrandTicker } from "@/components/zar/BrandTicker";
import {
  ClosingSection,
  DateSection,
  EventsSection,
  GallerySection,
  HeroSection,
  MessageSection,
  MusicToggle,
  OpeningSection,
  RsvpSection,
  VenueSection,
} from "@/components/zar/sections";
import { ErrorState, FallbackState, LoadingState, NotFoundState } from "@/components/zar/states";

export const Route = createFileRoute("/$slug")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Wedding Invitation" },
      { name: "description", content: "A digital wedding invitation, crafted with care." },
      { property: "og:title", content: "Wedding Invitation" },
      {
        property: "og:description",
        content: "A digital wedding invitation, crafted with care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvitationRoute,
  errorComponent: () => <ErrorState onRetry={() => window.location.reload()} />,
  notFoundComponent: NotFoundState,
});

function InvitationRoute() {
  const { slug: routeSlug } = Route.useParams();
  const [payload, setPayload] = useState<ZarPayload | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setStatus("loading");
    setAttempt((a) => a + 1);
  }, []);

  useEffect(() => {
    let active = true;
    const slug = readSlug(window.location.pathname);
    if (!slug) {
      setPayload({ state: "not_found" });
      setStatus("ready");
      return;
    }
    setStatus("loading");
    fetchInvitation(slug)
      .then((result) => {
        if (!active) return;
        setPayload(result);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [routeSlug, attempt]);

  if (status === "loading") return <LoadingState />;
  if (status === "error" || !payload) return <ErrorState onRetry={retry} />;
  if (payload.state === "not_found") return <NotFoundState />;
  if (payload.state === "fallback") return <FallbackState />;

  const content = payload.content;
  if (!content) return <NotFoundState />;

  const events = Array.isArray(content.events)
    ? content.events.filter((event) => event && typeof event === "object")
    : [];
  const gallery = Array.isArray(content.gallery) ? content.gallery : [];
  // Resolve music source: prefer RPC URL, otherwise fallback to bundled MP3
  const musicSrc = content.music_enabled && typeof content.music_url === "string" && content.music_url.trim()
    ? content.music_url.trim()
    : fallbackMusic;

  const musicEnabled = Boolean(content.music_enabled && musicSrc);

  return (
    <main className="zar-page relative min-h-screen overflow-x-hidden">
      <OpeningSection />
      <HeroSection content={content} />
      <DateSection content={content} />
      <MessageSection content={content} />
      <EventsSection events={events} />
      <VenueSection content={content} />
      <GallerySection gallery={gallery} />
      <RsvpSection />
      <ClosingSection content={content} publicUrl={payload.public_url} />
      <BrandTicker brandName={payload.brand_name} />
      {musicEnabled && <MusicToggle src={musicSrc} autoPlay={true} />}

    </main>
  );
}
