"use client";

import Image from "next/image";
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
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    tempId: 0,
    testimonial:
      "Bader is managing my property and is easy to work with, honest, and competent. Installing a dishwasher, TV mount, and light fixture, and ready to do more. Very pleased.",
    by: "Kathrin Lake",
    project: "Home Upgrade",
    source: "Google",
    avatar: "/images/victoria-home-entry-renovation-exterior.webp",
  },
  {
    tempId: 3,
    testimonial:
      "I am the owner of Indian Aroma Restaurant. Bader and his team at CVR Construction did a lot of renovation work in my commercial restaurant and my house, and they did a really nice job. Thank you Bader, thank you CVR Construction.",
    by: "Usingh Panwar",
    project: "Commercial + Residential",
    source: "Google",
    avatar: "/images/victoria-whole-home-renovation-interior.webp",
  },
  {
    tempId: 4,
    testimonial:
      "Bader did a great job with the renovation of my kitchen, bathroom, kitchen cabinets, painting, and flooring. Highly recommended.",
    by: "Chaith",
    project: "Kitchen + Bathroom",
    source: "Google",
    avatar: "/images/victoria-custom-kitchen-renovation.webp",
  },
  {
    tempId: 5,
    testimonial:
      "Great company to work with. Project completed on time and within budget.",
    by: "Pizza Al Forno - Victoria",
    project: "Commercial Upgrade",
    source: "Google",
    avatar: "/images/victoria-premium-kitchen-interior.webp",
  },
  {
    tempId: 6,
    testimonial:
      "Thanks CVR Construction for all the hard work you did in my house to turn it into my dream home. I appreciate your management, timeline, and quality of work. Thank you Bader for taking my ideas and making them real.",
    by: "Varma Mudunuri",
    project: "Full Home Remodeling",
    source: "Google",
    avatar: "/images/victoria-garden-studio-hero.png",
  },
  {
    tempId: 7,
    testimonial:
      "I am writing to thank you for the quality of service provided by your company. This company is very professional and hardworking. They finished my kitchen very quickly and I am very satisfied with the results. I would work with them again.",
    by: "Khawla Khatib",
    project: "Kitchen Renovation",
    source: "Google",
    avatar: "/images/victoria-premium-bathroom-finish-detail.webp",
  },
  {
    tempId: 8,
    testimonial:
      "I’m very happy with the work Bader did on my deck. He was responsible, punctual, and took pride in doing the job right. He communicated clearly throughout the project and made sure everything was finished to a high standard. It’s not easy to find someone this dependable. Highly recommended!",
    by: "Henry Zou",
    project: "Deck Renovation",
    source: "Google",
    avatar: "/images/victoria-home-entry-renovation-exterior.webp",
  },
  {
    tempId: 2,
    testimonial:
      "Bader and his team finished my commercial renovation in record time. Bader is a great communicator and listened to what I wanted done, then made professional and experienced recommendations. Always punctual and showed up when they said they would.",
    by: "Roxanne Derkson",
    project: "Commercial Renovation",
    source: "Google",
    avatar: "/images/victoria-commercial-interior-renovation.webp",
  },
  {
    tempId: 11,
    testimonial:
      "We had CVR Construction conduct a complete tear down and rebuild of our main bathroom. CVR provided that rare experience of not only doing exactly what they said they were going to do, but doing it for the price promised and on a timely basis. Very hard working people, and they went to great lengths to respect our privacy and keep the job site as clean as possible. We have owned our home for 37 years and have conducted many renovations since, including the kitchen twice. Best experience by a country mile.",
    by: "John",
    project: "Main Bathroom Renovation",
    source: "Google",
    avatar: "/images/victoria-premium-bathroom-finish-detail.webp",
  },
  {
    tempId: 10,
    testimonial:
      "Had a great experience with Bader and his crew. We had a defunct bathroom in our basement that had been installed years ago and was in very poor condition. It had to be completely gutted, with new plumbing put in. We also wanted to get a kitchen placed on the outside of the bathroom so that we could have a pseudo suite in the basement. Bader and the crew worked closely with me to determine exactly what was wanted and how work would proceed. Very happy with the end results. Very easy to get along with and great communication.",
    by: "EA M",
    project: "Basement Bathroom + Kitchen",
    source: "Google",
    avatar: "/images/victoria-whole-home-renovation-interior.webp",
  },
  {
    tempId: 9,
    testimonial:
      "In July 2025, we needed a complete spare bathroom renovation. After researching several companies and speaking with Bader, we chose CVR Construction. We were very satisfied with all aspects of the work performed. Bader adhered to the price quote even though substantial, unexpected issues came up, which we appreciated. Trust was important to us, and we established that trust very quickly. Bader kept us informed throughout the project, and the job was completed on time with quality workmanship and within the quoted terms. We would highly recommend CVR Construction for any building or renovation requirements and will certainly use them again should the need arise. Thanks again, Bader!",
    by: "Rick M.",
    project: "Spare Bathroom Renovation",
    source: "Yelp",
    avatar: "/images/victoria-premium-bathroom-finish-detail.webp",
  },
  {
    tempId: 12,
    testimonial:
      "Beder did a fantastic job performing upgrades on our house. He was professional, reliable, and very easy to talk to. I would highly recommend CVR Construction for any interior or exterior project!",
    by: "Rob Basi",
    project: "Home Upgrades",
    source: "Google",
    avatar: "/images/victoria-home-entry-renovation-exterior.webp",
  },
  {
    tempId: 13,
    testimonial:
      "We couldn’t be happier with our new shower. From start to finish, Bader at CVR Construction was professional, punctual, and incredibly detail oriented. Bader listened to our ideas, offered helpful suggestions, respected our budget, and kept us updated throughout the process. The craftsmanship is outstanding — the tile work is flawless, and the overall design feels modern and inviting. They also kept the workspace clean and tidy each day. We would absolutely recommend Bader to anyone looking to upgrade their bathroom.",
    by: "Hummingbird 250",
    project: "Shower Renovation",
    source: "Google",
    avatar: "/images/victoria-white-shower-bath-single-001.webp",
  },
  {
    tempId: 14,
    testimonial:
      "Had Bader do my kitchen and bathroom and honestly, he did an amazing job. He managed to find something that was in my budget, not to mention the amazing customer service his team provided.",
    by: "Tiger M",
    project: "Kitchen + Bathroom",
    source: "Google",
    avatar: "/images/victoria-custom-kitchen-renovation.webp",
  },
  {
    tempId: 15,
    testimonial:
      "CVR Construction LTD did an outstanding job renovating our basement. From start to finish, their team was professional, detail-oriented, and efficient. They transformed the space into a warm, functional area that exceeded our expectations. Highly recommend for any home renovation needs, kitchen and bathroom, and lots more.",
    by: "Shibu Kizhakkekuttu",
    project: "Basement Renovation",
    source: "Google",
    avatar: "/images/victoria-garden-studio-hero.png",
  },
  {
    tempId: 16,
    testimonial:
      "CVR Construction built a pergola on our deck out here at East Sooke Rd. Completed it in a timely manner and the outcome was what we expected. Highly recommended. 5 out of 5 stars!",
    by: "Kevin Olid",
    project: "Pergola Build",
    source: "Facebook",
    avatar: "/images/victoria-home-entry-renovation-exterior.webp",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
  setCardRef: (id: number, node: HTMLDivElement | null) => void;
  onViewMore: (testimonial: Testimonial) => void;
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
  onViewMore,
}) => {
  const isCenter = position === 0;
  const distance = Math.abs(position);
  const isVisible = distance <= 2;
  const hasLongReview = testimonial.testimonial.length > 260;

  return (
    <div
      ref={(node) => setCardRef(testimonial.tempId, node)}
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 flex h-[26.5rem] cursor-pointer flex-col overflow-hidden border-2 p-8 transition-all duration-500 ease-in-out sm:h-[29rem]",
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
              "relative h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-black",
              isCenter
                ? "border-primary-foreground/35 shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
                : "border-border shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
            )}
          >
            <Image
              src={testimonial.avatar}
              alt={`${testimonial.by} review avatar`}
              fill
              sizes="48px"
              className="object-cover"
            />
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
          "min-h-0 flex-1 overflow-hidden text-base font-medium leading-[1.45] tracking-[-0.03em] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] sm:text-xl",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        &quot;{testimonial.testimonial}&quot;
      </h3>

      <div className="mt-4 flex min-h-7 items-center">
        {hasLongReview ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onViewMore(testimonial);
            }}
            className={cn(
              "w-fit border-b border-current pb-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2",
              isCenter ? "text-primary-foreground/75" : "text-muted-foreground"
            )}
          >
            View More
          </button>
        ) : null}
      </div>

      <p
        className={cn(
          "mt-3 border-t pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em]",
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
  const [containerHeight, setContainerHeight] = useState(700);
  const [expandedReview, setExpandedReview] = useState<Testimonial | null>(null);
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

  useEffect(() => {
    if (!expandedReview) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedReview(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [expandedReview]);

  const setCardRef = (id: number, node: HTMLDivElement | null) => {
    cardRefs.current[id] = node;
  };

  return (
    <>
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
            onViewMore={setExpandedReview}
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

    {expandedReview ? (
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="expanded-review-title"
        onClick={() => setExpandedReview(null)}
      >
        <div
          className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-none border border-white/14 bg-black p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p id="expanded-review-title" className="text-sm font-semibold uppercase tracking-[0.12em]">
                {expandedReview.by}
              </p>
              <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">
                {expandedReview.project} / {expandedReview.source}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close full review"
              onClick={() => setExpandedReview(null)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-xl leading-none transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              ×
            </button>
          </div>
          <FiveStars active />
          <p className="mt-6 text-lg font-medium leading-8 tracking-[-0.03em] sm:text-xl sm:leading-9">
            &quot;{expandedReview.testimonial}&quot;
          </p>
        </div>
      </div>
    ) : null}
    </>
  );
};
