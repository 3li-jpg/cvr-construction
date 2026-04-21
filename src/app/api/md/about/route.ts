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

- Whole-home renovations
- Kitchens and bathrooms
- Custom garden studios and accessory spaces
- Commercial tenant improvements

## Contact

- Website: https://www.cvrconstruction.ca
- Email: info@cvrconstruction.ca
- Phone: +1-250-880-1270
`;

export function GET() {
  return markdownResponse({
    body: BODY,
    title: "About | CVR Construction",
    path: "/about",
  });
}
