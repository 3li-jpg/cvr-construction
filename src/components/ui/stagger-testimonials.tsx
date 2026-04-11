"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "CVR brought order to a complex renovation. The schedule stayed clear, the site stayed organized, and the final finish feels properly premium.",
    by: "Emma, Homeowner in Oak Bay",
    imgSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 1,
    testimonial:
      "The bathroom detailing was handled with real discipline. Nothing felt improvised and every material transition was resolved cleanly.",
    by: "Daniel, Property Owner",
    imgSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 2,
    testimonial:
      "Communication stayed sharp from the walkthrough to handover. We always knew what was happening and what decision was needed next.",
    by: "Sofia, Interior Client",
    imgSrc:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 3,
    testimonial:
      "They handled our commercial refresh without the usual chaos. Quality stayed high even while the schedule stayed tight.",
    by: "Marcus, Studio Director",
    imgSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 4,
    testimonial:
      "What stood out was the restraint. They did not oversell anything, they just delivered careful work that reads well up close.",
    by: "Grace, Renovation Client",
    imgSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 5,
    testimonial:
      "We were balancing budget, design, and timing, and CVR kept all three under control without losing the quality of the result.",
    by: "Leah, Project Lead",
    imgSrc:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 6,
    testimonial:
      "Our garden studio feels intentional instead of added on. The proportions, trim work, and exterior detailing all feel composed.",
    by: "Noah, Homeowner",
    imgSrc:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 7,
    testimonial:
      "The process felt calm the whole way through. Even when we changed direction on a few items, the team kept the project moving.",
    by: "Ava, Victoria Client",
    imgSrc:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 8,
    testimonial:
      "The workmanship is what people notice first. Better flow, cleaner lines, and details that hold up when you are standing right in the room.",
    by: "Julian, Custom Build Client",
    imgSrc:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;
  const distance = Math.abs(position);
  const isVisible = distance <= 2;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-20 border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-card-foreground hover:border-primary/50",
        !isVisible && "pointer-events-none opacity-0"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.45) * position}px)
          translateY(${isCenter ? -54 : position % 2 ? 18 : -18}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.92})
        `,
        boxShadow: isCenter ? "0px 10px 0px 0px var(--border)" : "0px 18px 48px -28px rgba(0,0,0,0.28)",
        zIndex: 20 - distance,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />

      <Image
        src={testimonial.imgSrc}
        alt={testimonial.by.split(",")[0]}
        width={56}
        height={64}
        className="mb-5 h-16 w-14 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px var(--background)",
        }}
      />

      <h3
        className={cn(
          "text-base font-medium leading-[1.45] tracking-[-0.03em] sm:text-xl",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        &quot;{testimonial.testimonial}&quot;
      </h3>

      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    if (steps === 0) {
      return;
    }

    const newList = [...testimonialsList];

    if (steps > 0) {
      for (let i = steps; i > 0; i -= 1) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i += 1) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }

    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length - 1) / 2
            : index - testimonialsList.length / 2;

        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center border-2 bg-background text-2xl transition-colors",
            "border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center border-2 bg-background text-2xl transition-colors",
            "border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
