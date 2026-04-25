import { markdownResponse } from "@/lib/markdownResponse";

export const dynamic = "force-static";

const BODY = `# About CVR Construction

CVR Construction Ltd. is a Victoria, BC construction company delivering
premium renovations and custom builds across Greater Victoria and
Vancouver Island.

## Who we are

- Based in Victoria, British Columbia, Canada
- Focused on quality, clean execution, and clear communication
- Led by a small team of builders who stay on every project end-to-end

## What we build

- Full home remodeling
- Kitchens and bathrooms
- Custom spaces
- Commercial upgrades

## Contact

- Website: https://www.cvrconstruction.ca
- Email: cvrconstruction@outlook.com
- Phone: +1-250-880-1270
`;

export function GET() {
  return markdownResponse({
    body: BODY,
    title: "About | CVR Construction",
    path: "/about",
  });
}
