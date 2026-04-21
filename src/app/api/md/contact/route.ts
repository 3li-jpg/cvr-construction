import { markdownResponse } from "@/lib/markdownResponse";

export const dynamic = "force-static";

const BODY = `# Contact CVR Construction

Get in touch to start a renovation, custom build, or commercial project
in Greater Victoria or on Vancouver Island.

## Channels

- **Email:** info@cvrconstruction.ca
- **Phone:** +1-250-880-1270
- **WhatsApp:** https://wa.me/12508801270
- **Instagram:** https://www.instagram.com/cvr_construction_ltd/
- **Facebook:** https://www.facebook.com/profile.php?id=61552800609732
- **Contact form:** https://www.cvrconstruction.ca/contact

## Office hours

Monday to Friday, 8:00 – 17:00 Pacific Time.

## What to include

When reaching out, please share:

1. Project type (kitchen, bathroom, whole-home, commercial, garden studio)
2. Rough scope or square footage
3. Location in Greater Victoria or Vancouver Island
4. Target timeline and budget range
5. Your name, email, and phone number
`;

export function GET() {
  return markdownResponse({
    body: BODY,
    title: "Contact | CVR Construction",
    path: "/contact",
  });
}
