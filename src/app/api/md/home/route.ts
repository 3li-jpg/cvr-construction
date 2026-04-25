import { markdownResponse } from "@/lib/markdownResponse";

export const dynamic = "force-static";

const BODY = `# CVR Construction — Premium Construction Company in Victoria, BC

> Victoria, BC construction company specializing in premium home renovations,
> kitchen & bathroom remodels, custom spaces, and detail-driven commercial
> upgrades across Greater Victoria and Vancouver Island.

- **Website:** https://www.cvrconstruction.ca
- **Email:** cvrconstruction@outlook.com
- **Phone:** +1-250-880-1270
- **WhatsApp:** https://wa.me/12508801270
- **Location:** 1226 Finlayson Street, Victoria, BC V8T 2V3, Canada

## Services

- Full home remodeling
- Kitchen renovation
- Bathroom remodeling
- Commercial upgrades
- Custom spaces
- Tile, flooring, and fixtures

## Service area

- Greater Victoria, BC
- Saanich Peninsula
- Vancouver Island

## How we work

1. **Discovery.** A short call or site visit to understand scope, constraints,
   and aesthetic direction.
2. **Design & planning.** Scope, materials, trades, and schedule are finalized
   before any demo begins.
3. **Build.** Clean sites, weekly updates, and documented decisions.
4. **Handoff.** Punch list, care guide, and warranty coverage.

## Featured work

- Victoria Garden Studio — custom detached studio
- Kitchen & bath remodels across Oak Bay, Fairfield, and Saanich
- Whole-home renovations on Vancouver Island

## Talk to us

Use the contact form at https://www.cvrconstruction.ca/contact or call
+1-250-880-1270 during Pacific business hours.

## Agent resources

- API catalog: https://www.cvrconstruction.ca/.well-known/api-catalog
- Agent skills index: https://www.cvrconstruction.ca/.well-known/agent-skills/index.json
- Sitemap: https://www.cvrconstruction.ca/sitemap.xml
- Documentation: https://www.cvrconstruction.ca/docs/api
`;

export function GET() {
  return markdownResponse({
    body: BODY,
    title: "CVR Construction | Premium Construction Company in Victoria, BC",
    path: "/",
  });
}
