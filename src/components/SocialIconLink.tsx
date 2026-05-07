import type { AnchorHTMLAttributes, ReactNode } from "react";

type SocialLinkLabel =
  | "Instagram"
  | "Facebook"
  | "TikTok"
  | "YouTube"
  | "WhatsApp"
  | "Google"
  | "Yelp";

type SocialIconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: SocialLinkLabel;
  iconClassName?: string;
};

const socialIconColors: Record<SocialLinkLabel, string> = {
  Instagram: "#E4405F",
  Facebook: "#1877F2",
  TikTok: "#FFFFFF",
  YouTube: "#FF0000",
  WhatsApp: "#25D366",
  Google: "#4285F4",
  Yelp: "#D32323",
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
  TikTok: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.4 5.55a5.08 5.08 0 0 1-1.4-3.48h-3.37v13.36a2.86 2.86 0 1 1-2.03-2.74V9.27a6.26 6.26 0 1 0 5.4 6.2V8.67a8.4 8.4 0 0 0 4.9 1.56V6.86a5.04 5.04 0 0 1-3.5-1.31Z" />
    </svg>
  ),
  YouTube: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.92 4.78 12 4.78 12 4.78s-5.92 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95A28.7 28.7 0 0 0 1.96 12c0 1.6.15 3.2.46 4.81a2.75 2.75 0 0 0 1.94 1.95c1.72.46 7.64.46 7.64.46s5.92 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95c.31-1.61.46-3.21.46-4.81 0-1.6-.15-3.2-.46-4.81ZM10 15.27V8.73L15.45 12 10 15.27Z" />
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
  Google: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.97 10.97 0 0 0 1 12c0 1.77.42 3.44 1.18 4.94l3.66-2.84Z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38Z" />
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
      <span className="inline-flex" style={{ color: socialIconColors[label] }}>
        {iconRenderers[label](iconClassName)}
      </span>
      <span className="sr-only">{label}</span>
    </a>
  );
}
