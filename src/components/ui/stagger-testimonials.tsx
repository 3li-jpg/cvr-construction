"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

type Testimonial = {
  tempId: number;
  testimonial: string;
  by: string;
  project: string;
  source: string;
};

const testimonials: Testimonial[] = [
  {
    tempId: 0,
    testimonial:
      "Bader is managing my property and is easy to work with, honest, and competent. Installing a dishwasher, TV mount, and light fixture, and ready to do more. Very pleased.",
    by: "Kathrin Lake",
    project: "Home Upgrade",
    source: "Client Feedback",
  },
  {
    tempId: 1,
    testimonial:
      "I highly recommend this business. I was completely impressed with their professionalism and customer service.",
    by: "Aseel Stra",
    project: "General Contracting",
    source: "Client Feedback",
  },
  {
    tempId: 2,
    testimonial:
      "Bader and his team finished my commercial renovation in record time. Bader is a great communicator and listened to what I wanted done, then made professional and experienced recommendations. Always punctual and showed up when they said they would.",
    by: "Roxanne Derkson",
    project: "Commercial Renovation",
    source: "Client Feedback",
  },
  {
    tempId: 3,
    testimonial:
      "I am the owner of Indian Aroma Restaurant. Bader and his team at CVR Construction did a lot of renovation work in my commercial restaurant and my house, and they did a really nice job. Thank you Bader, thank you CVR Construction.",
    by: "Usingh Panwar",
    project: "Commercial + Residential",
    source: "Client Feedback",
  },
  {
    tempId: 4,
    testimonial:
      "Bader did a great job with the renovation of my kitchen, bathroom, kitchen cabinets, painting, and flooring. Highly recommended.",
    by: "Chaith",
    project: "Kitchen + Bathroom",
    source: "Client Feedback",
  },
  {
    tempId: 5,
    testimonial:
      "Great company to work with. Project completed on time and within budget.",
    by: "Pizza Al Forno - Victoria",
    project: "Commercial Upgrade",
    source: "Client Feedback",
  },
  {
    tempId: 6,
    testimonial:
      "Thanks CVR Construction for all the hard work you did in my house to turn it into my dream home. I appreciate your management, timeline, and quality of work. Thank you Bader for taking my ideas and making them real.",
    by: "Varma Mudunuri",
    project: "Full Home Remodeling",
    source: "Client Feedback",
  },
  {
    tempId: 7,
    testimonial:
      "I am writing to thank you for the quality of service provided by your company. This company is very professional and hardworking. They finished my kitchen very quickly and I am very satisfied with the results. I would work with them again.",
    by: "Khawla Khatib",
    project: "Kitchen Renovation",
    source: "Client Feedback",
  },
] ;

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
  setCardRef: (id: number, node: HTMLDivElement | null) => void;
}

function FiveStars({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center gap-1 text-[0.68rem] tracking-[0.08em]",
        active ? "text-current/90" : "text-current/55"
      )}
    >
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
  );
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  setCardRef,
}) => {
  const isCenter = position === 0;
  const distance = Math.abs(position);
  const isVisible = distance <= 2;
  const initials = testimonial.by
    .split(" ")
    .map((n) => n[0])
    .join("")
    .replace(".", "");

  return (
    <div
      ref={(node) => setCardRef(testimonial.tempId, node)}
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 flex cursor-pointer flex-col border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-20 border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-card-foreground hover:border-primary/50",
        !isVisible && "pointer-events-none opacity-0"
      )}
      style={{
        width: cardSize,
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.45) * position}px)
          translateY(${isCenter ? -54 : position % 2 ? 18 : -18}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.92})
        `,
        boxShadow: isCenter
          ? "0px 10px 0px 0px var(--border)"
          : "0px 18px 48px -28px rgba(0,0,0,0.28)",
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

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center text-sm font-bold",
              isCenter
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {initials}
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.08em]",
                isCenter ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {testimonial.by}
            </span>
            <span
              className={cn(
                "mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]",
                isCenter ? "text-primary-foreground/70" : "text-muted-foreground"
              )}
            >
              {testimonial.project}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <FiveStars active={isCenter} />
          <span
            className={cn(
              "text-[0.62rem] font-semibold uppercase tracking-[0.14em]",
              isCenter ? "text-primary-foreground/65" : "text-muted-foreground"
            )}
          >
            {testimonial.source}
          </span>
        </div>
      </div>

      <h3
        className={cn(
          "flex-1 text-base font-medium leading-[1.45] tracking-[-0.03em] sm:text-xl",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        &quot;{testimonial.testimonial}&quot;
      </h3>

      <p
        className={cn(
          "mt-6 border-t pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em]",
          isCenter
            ? "border-primary-foreground/15 text-primary-foreground/72"
            : "border-border text-muted-foreground"
        )}
      >
        Verified Client Review
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(390);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [containerHeight, setContainerHeight] = useState(585);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

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
      setCardSize(matches ? 390 : 305);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const heights = Object.values(cardRefs.current)
        .map((node) => node?.getBoundingClientRect().height ?? 0)
        .filter(Boolean);

      if (heights.length === 0) {
        return;
      }

      const tallest = Math.max(...heights);
      setContainerHeight(Math.ceil(tallest + 155));
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    Object.values(cardRefs.current).forEach((node) => {
      if (node) {
        resizeObserver.observe(node);
      }
    });

    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [cardSize, testimonialsList]);

  const setCardRef = (id: number, node: HTMLDivElement | null) => {
    cardRefs.current[id] = node;
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: containerHeight }}
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
            setCardRef={setCardRef}
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
