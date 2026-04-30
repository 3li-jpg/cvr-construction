"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface Accordion07Item {
  id: string;
  number: string;
  title: string;
  content: string;
}

interface Accordion07Props {
  items: Accordion07Item[];
  className?: string;
}

const Accordion07 = ({ items, className }: Accordion07Props) => {
  const [openItems, setOpenItems] = useState<string[]>(items[0]?.id ? [items[0].id] : []);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full">
        <Accordion
          value={openItems}
          onValueChange={setOpenItems}
          className="w-full border-t border-[color:var(--faq-line)]"
        >
          {items.map((item) => {
            const isActive = openItems.includes(item.id);
            const isHovered = hoveredId === item.id;

            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="relative border-none not-last:border-none"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <AccordionTrigger className="cursor-pointer rounded-none px-0 py-6 text-[var(--faq-text)] hover:no-underline focus-visible:ring-[color:var(--faq-focus)] **:data-[slot=accordion-trigger-icon]:hidden">
                  <div className="flex w-full items-center gap-4 sm:gap-6">
                    <div className="relative flex size-10 shrink-0 items-center justify-center">
                      <motion.div
                        className="absolute inset-1 border border-[color:var(--faq-cube-border)] bg-[var(--faq-cube-bg)] shadow-[5px_5px_0_var(--faq-cube-shadow)]"
                        initial={false}
                        animate={{
                          scale: isActive ? 1 : isHovered ? 0.85 : 0,
                          opacity: isActive ? 1 : isHovered ? 0.16 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                      <motion.span
                        className="relative z-10 text-xs font-semibold uppercase tracking-normal"
                        animate={{
                          color: isActive
                            ? "var(--faq-cube-text)"
                            : "var(--faq-text)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.number}
                      </motion.span>
                    </div>

                    <motion.span
                      className="text-left text-[1rem] font-semibold uppercase tracking-normal sm:text-[1.1rem]"
                      animate={{
                        x: isActive || isHovered ? 4 : 0,
                        color: "var(--faq-text)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      {item.title}
                    </motion.span>

                    <motion.div
                      className="ml-auto flex size-8 shrink-0 items-center justify-center"
                      animate={{
                        rotate: isActive ? 45 : 0,
                        opacity: isActive || isHovered ? 1 : 0.4,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Plus className="size-4 text-[var(--faq-text)]" />
                    </motion.div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-7 pl-14 pr-1 text-[0.98rem] leading-8 text-[var(--faq-text)] sm:pl-16 sm:pr-12 sm:text-[1.08rem] sm:leading-9">
                  {item.content}
                </AccordionContent>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--faq-line)]" />

                <motion.div
                  className="absolute bottom-0 left-0 h-px origin-left bg-[var(--faq-line-strong)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : isHovered ? 0.3 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default Accordion07;
