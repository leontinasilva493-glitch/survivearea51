import { CheckCircle2, ShieldAlert } from "lucide-react";

import type { CommunityVideo } from "@/data/community-videos";

import { EvidenceLink, VerificationStatus } from "./TrustUI";

type SupportingLink = {
  href: string;
  label: string;
};

type VideoEvidenceCardProps = {
  embed?: boolean;
  eyebrow: string;
  headingId: string;
  limits: readonly string[];
  summary: string;
  supportingLinks?: readonly SupportingLink[];
  supports: readonly string[];
  title: string;
  video: CommunityVideo;
};

export function VideoEvidenceCard({
  embed = false,
  eyebrow,
  headingId,
  limits,
  summary,
  supportingLinks = [],
  supports,
  title,
  video,
}: VideoEvidenceCardProps) {
  return (
    <section className="section-space terminal-panel overflow-hidden" aria-labelledby={headingId}>
      {embed ? (
        <div className="aspect-video border-b border-[var(--line)]">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
            loading="lazy"
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
            title={video.title}
          />
        </div>
      ) : null}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow !m-0">{eyebrow}</p>
          <VerificationStatus status="community-reported" />
        </div>
        <h2 className="display-font mt-5 text-3xl font-bold tracking-tight sm:text-4xl" id={headingId}>{title}</h2>
        <p className="max-w-3xl text-[var(--muted)]">{summary}</p>

        <div className="mono mt-5 flex flex-wrap gap-x-5 gap-y-2 border-y border-[var(--line)] py-4 text-[10px] uppercase tracking-[.09em] text-[var(--muted)]">
          <span>{video.creator}</span>
          <span>Published {video.published}</span>
          <span>{video.duration}</span>
          <span>Reviewed {video.reviewed}</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border border-[rgba(130,248,230,.24)] p-5">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--cyan)]" aria-hidden="true" /><h3 className="mono m-0 text-[10px] uppercase tracking-[.11em] text-[var(--cyan)]">Useful evidence</h3></div>
            <ul className="mb-0 mt-4 space-y-2 pl-5 text-sm text-[var(--muted)]">{supports.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="border border-[rgba(255,201,107,.28)] p-5">
            <div className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-[var(--amber)]" aria-hidden="true" /><h3 className="mono m-0 text-[10px] uppercase tracking-[.11em] text-[var(--amber)]">Evidence boundary</h3></div>
            <ul className="mb-0 mt-4 space-y-2 pl-5 text-sm text-[var(--muted)]">{limits.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
          <EvidenceLink href={video.url}>Watch the source video</EvidenceLink>
          {supportingLinks.map((link) => <EvidenceLink href={link.href} key={link.href}>{link.label}</EvidenceLink>)}
        </div>
      </div>
    </section>
  );
}
