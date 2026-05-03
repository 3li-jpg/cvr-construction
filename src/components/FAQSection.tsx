"use client";

import Accordion07, {
  type Accordion07Item,
} from "@/components/shadcn-space/accordion/accordion-07";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const faqItems: Accordion07Item[] = [
  {
    id: "premium-renovations",
    number: "01",
    title: "Why do homeowners choose CVR for premium renovations?",
    content:
      "Clients usually choose CVR because they want more than a basic contractor relationship. We focus on disciplined project execution, strong design judgment, clear communication, and finished work that feels refined in both function and detail.",
  },
  {
    id: "local-suppliers",
    number: "02",
    title: "Do you work with local suppliers and trades?",
    content:
      "Yes. We work with trusted local trades, suppliers, and fabrication partners to help maintain quality, coordination, and consistency throughout the project. Strong local relationships also help keep communication efficient and execution reliable.",
  },
  {
    id: "renovation-budgets",
    number: "03",
    title: "How do you help clients manage renovation budgets?",
    content:
      "We approach budgets by aligning scope, priorities, and finish level early. That means identifying where to invest, where to simplify, and how to avoid expensive changes later. A well-structured budget is not just about reducing cost - it is about making better decisions before construction starts.",
  },
  {
    id: "materials-finishes",
    number: "04",
    title: "Can you help us choose materials and finishes?",
    content:
      "Yes. We help clients make material and finish selections that work together visually, function properly for daily use, and make sense for the level of renovation they want. Good selections are not just about appearance - they affect durability, maintenance, and the overall feel of the space.",
  },
  {
    id: "renovation-value",
    number: "05",
    title: "How do you define value in a renovation project?",
    content:
      "We do not define value as the lowest price. We define it as the balance of planning, workmanship, materials, durability, and the quality of the finished result. For most premium renovations, long-term value comes from making fewer compromises and executing the work properly the first time.",
  },
  {
    id: "process-difference",
    number: "06",
    title: "What makes your process different from a typical contractor?",
    content:
      "Our process is structured around clarity and control. Clients need realistic expectations, a defined scope, good coordination, and communication that stays consistent as the work moves forward. We treat those parts of the job as essential, not optional.",
  },
  {
    id: "early-decisions",
    number: "07",
    title: "What should homeowners decide before starting a renovation?",
    content:
      "The most important early decisions are budget range, renovation priorities, functional needs, and the overall level of finish. Once those are clear, it becomes much easier to make smart decisions on layout, materials, fixtures, and construction scope.",
  },
  {
    id: "project-fit",
    number: "08",
    title: "Are you the right fit for every project?",
    content:
      "No. We are best suited for clients who want a premium result, care about detail, and want the process handled professionally from planning through construction. The best fit is usually a client who values quality, thoughtful decisions, and long-term results over quick shortcuts.",
  },
];

export function FAQSection() {
  return (
    <section className="overflow-hidden bg-[var(--faq-bg)] py-24 text-[var(--faq-text)] md:py-32">
      <div className="site-shell px-3 sm:px-5 lg:px-8 xl:px-10">
        <div className="grid gap-14 xl:grid-cols-[0.9fr_1.1fr] xl:gap-20">
          <div className="max-w-xl text-center xl:text-left">
            <Reveal direction="up" duration={0.8} distance={34}>
              <SectionEyebrow className="justify-center text-[0.78rem] tracking-[0.18em] text-white xl:justify-start">
                FAQ
              </SectionEyebrow>
            </Reveal>
            <Reveal direction="up" delay={0.08} duration={0.95} distance={54}>
              <h2 className="mx-auto mt-5 max-w-[11ch] text-[3.05rem] font-black uppercase leading-[0.9] tracking-normal text-white sm:text-[3.45rem] md:text-[4.3rem] xl:mx-0">
                What Homeowners Ask Before They Build
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.16} duration={0.9} distance={34}>
              <p className="mx-auto mt-7 max-w-lg text-[1rem] leading-8 text-white/68 md:text-[1.15rem] md:leading-9 xl:mx-0">
                These are the questions that usually come up when clients are comparing
                renovation companies, planning budgets, and making decisions about materials,
                finishes, and overall project scope.
              </p>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.12} duration={1} distance={48}>
            <Accordion07 items={faqItems} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
