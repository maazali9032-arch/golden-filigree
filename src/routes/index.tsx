import { createFileRoute } from "@tanstack/react-router";
import { FiligreeArch, FiligreeDivider, FiligreeFrame } from "@/components/zar/filigree";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZAR — Digital Wedding Invitations" },
      {
        name: "description",
        content:
          "ZAR crafts golden filigree digital wedding invitations. Open the personal link shared with you to view an invitation.",
      },
      { property: "og:title", content: "ZAR — Digital Wedding Invitations" },
      {
        property: "og:description",
        content: "Open the personal invitation link shared with you to view your invitation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="zar-page flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <FiligreeArch className="mx-auto max-w-[260px]" />
        <FiligreeFrame delay={0.4}>
          <h1 className="zar-gold-text font-display text-2xl uppercase tracking-[0.28em]">
            A moment forever
          </h1>
          <FiligreeDivider delay={0.9} className="mx-auto my-5" />
          <p className="font-display text-base italic leading-relaxed text-ink-soft">
            Every invitation lives at its own private link. Please open the link shared with you to
            view the invitation.
          </p>
        </FiligreeFrame>
      </div>
    </main>
  );
}
