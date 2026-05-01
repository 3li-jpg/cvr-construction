import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { socialLinks } from "@/lib/site-data";

type SocialLinkLabel = (typeof socialLinks)[number]["label"];

type SocialIconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: SocialLinkLabel;
  iconClassName?: string;
};

const iconRenderers: Record<SocialLinkLabel, (className: string) => ReactNode> = {
  Instagram: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
    </svg>
  ),
  Facebook: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.2 8.25h2.35V4.6h-2.9c-3.15 0-4.85 1.9-4.85 4.8v2.05H6v3.7h2.8V22h4.05v-6.85h2.85l.55-3.7h-3.4V9.8c0-1.05.35-1.55 1.35-1.55Z" />
    </svg>
  ),
  WhatsApp: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.2 20.1 5.3 16.2A8.2 8.2 0 1 1 8 18.8L4.2 20.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 8.7c.2-.45.35-.5.65-.5h.45c.18 0 .4.02.58.45.22.52.7 1.75.76 1.88.06.15.1.32 0 .52-.15.28-.28.43-.52.7-.12.13-.28.3-.12.58.15.28.7 1.15 1.52 1.85 1.05.9 1.9 1.18 2.2 1.32.3.15.48.12.67-.08.2-.23.78-.9 1-1.2.2-.3.42-.25.7-.15.3.1 1.82.85 2.12 1 .32.15.52.23.6.35.08.13.08.8-.18 1.55-.25.75-1.45 1.42-2 1.48-.52.05-1.2.23-3.9-.88-3.3-1.35-5.38-4.7-5.55-4.92-.16-.22-1.32-1.75-1.32-3.35 0-1.58.82-2.35 1.12-2.68Z"
        fill="currentColor"
      />
    </svg>
  ),
  Yelp: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10.8 10.15 9.15 3.7c-.18-.7.22-1.4.92-1.58l1.92-.5c.7-.18 1.38.25 1.48.98l.58 6.6c.08.92-.5 1.62-1.4 1.78-.88.15-1.58-.18-1.85-.83Z" />
      <path d="m14.55 11.25 5.6-3.05c.62-.35 1.42-.1 1.77.55l.95 1.72c.35.65.1 1.43-.58 1.72l-5.95 2.45c-.83.35-1.62.02-2.02-.78-.38-.78-.3-1.78.23-2.6Z" />
      <path d="m14.58 15.25 5.95 2.08c.68.25 1.02.98.78 1.65l-.68 1.82c-.25.68-1 .98-1.65.68l-5.62-3.02c-.78-.42-1.02-1.25-.65-2.08.35-.8 1.02-1.25 1.87-1.13Z" />
      <path d="m10.9 15.85-3.65 5.25c-.42.6-1.25.72-1.82.28l-1.52-1.18c-.58-.45-.65-1.28-.15-1.82l4.42-4.65c.62-.65 1.48-.65 2.12-.02.62.6.85 1.38.6 2.15Z" />
      <path d="m9.6 12.2-6.02.98c-.72.12-1.38-.38-1.48-1.1l-.25-1.9c-.08-.72.45-1.35 1.18-1.38l6.08-.1c.9-.02 1.52.58 1.58 1.48.08.87-.3 1.62-1.1 2.02Z" />
    </svg>
  ),
};

export function SocialIconLink({
  label,
  className,
  iconClassName = "h-4 w-4",
  ...props
}: SocialIconLinkProps) {
  return (
    <a {...props} aria-label={props["aria-label"] ?? label} className={className}>
      {iconRenderers[label](iconClassName)}
      <span className="sr-only">{label}</span>
    </a>
  );
}
