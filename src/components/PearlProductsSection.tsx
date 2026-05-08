"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import {
  pearlProductCategories,
  pearlProducts,
  type PearlProduct,
} from "@/lib/pearl-products";
import { cn } from "@/lib/utils";

const categoryGridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
};

const categoryCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT_EXPO },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.98,
    transition: { duration: 0.24 },
  },
};

type CategoryGroup = {
  id: string;
  label: string;
  summary: string;
  count: number;
  index: string;
  image: string;
  imageAlt: string;
  products: readonly PearlProduct[];
  sections: string[];
};

const categoryImages: Record<string, { image: string; alt: string }> = {
  "kitchen-faucets": {
    image: "/images/pearl/lennox-ii-kitchen-faucet-gbf816b-fg.webp",
    alt: "Ferreira gold kitchen faucet",
  },
  "bathroom-faucets": {
    image: "/images/pearl/pearl-madeleine-ferreira-gold-bathroom-faucet-tgbf882.webp",
    alt: "Ferreira gold bathroom faucet",
  },
  "kitchen-sinks": {
    image: "/images/pearl/pearl-qila-e-gqd3219a.webp",
    alt: "Stainless steel kitchen sink",
  },
  "bathroom-sinks": {
    image: "/images/pearl/eternal-chronos-matte-black-vessel-sink-gbc526-bl.webp",
    alt: "Matte black vessel bathroom sink",
  },
  toilets: {
    image: "/images/pearl/ellison-ii-bidet-smart-toilet-gbwb802.webp",
    alt: "Smart bidet toilet",
  },
  "shower-systems": {
    image: "/images/pearl/pearl-madison-ii-shower-set-tgbbm-set-b.webp",
    alt: "Madison shower system",
  },
  "tub-fillers": {
    image: "/images/pearl/pearl-elena-chrome-free-standing-roman-tub-filler-faucet-gbr205.webp",
    alt: "Freestanding tub filler",
  },
  "pot-fillers": {
    image: "/images/pearl/pearl-darren-chrome-kitchen-pot-filler-gbf837.webp",
    alt: "Kitchen pot filler",
  },
  "kitchen-accessories": {
    image: "/images/pearl/sapelli-cutting-board.webp",
    alt: "Sapelli cutting board kitchen accessory",
  },
  "bathroom-accessories": {
    image: "/images/pearl/wilson-towel-bar-tgbaw-bar.webp",
    alt: "Wilson towel bar bathroom accessory",
  },
  "range-hoods": {
    image: "/images/pearl/kruger-alto-m-30-under-cabinet-range-hood-km300.webp",
    alt: "Kruger under cabinet range hood",
  },
  "ella-home-care-senior-living": {
    image: "/images/pearl/pearl-ella-adjustable-shower-seat-gls320a-w.webp",
    alt: "Ella adjustable shower seat",
  },
};

export function PearlProductsSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const categoryGroups = useMemo<CategoryGroup[]>(() => {
    return pearlProductCategories.map((category) => {
      const products = pearlProducts.filter(
        (product) => product.category === category.label
      );
      const representative = products[0];
      const categoryImage = categoryImages[category.id] ?? {
        image: representative?.image ?? "",
        alt: representative?.alt ?? category.label,
      };

      return {
        ...category,
        image: categoryImage.image,
        imageAlt: categoryImage.alt,
        products,
        sections: Array.from(new Set(products.map((product) => product.section))),
      };
    });
  }, []);

  const activeCategory = categoryGroups.find(
    (category) => category.id === activeCategoryId
  );

  useEffect(() => {
    if (!activeCategory) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveCategoryId(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCategory]);

  return (
    <section
      id="pearl-products"
      aria-labelledby="pearl-products-heading"
      className="relative overflow-hidden border-y border-[color:var(--showroom-line)] bg-[var(--showroom-bg)] py-20 text-[var(--showroom-text)] md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="hidden"
      />

      <div className="site-shell relative z-10">
        <Reveal direction="up" duration={0.75} distance={30}>
          <div className="mx-auto flex max-w-[78rem] flex-col items-center text-center">
            <SectionEyebrow className="justify-center text-[0.78rem] tracking-[0.18em] text-[var(--showroom-text)]">
              SHOWROOM PRODUCT CATEGORIES
            </SectionEyebrow>
            <h2
              id="pearl-products-heading"
              className="mt-6 max-w-[13ch] text-[2.75rem] font-black uppercase leading-[0.86] tracking-[-0.06em] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem]"
            >
              Browse By Category
            </h2>
            <p className="mt-6 max-w-[44rem] text-[1rem] leading-7 text-[var(--showroom-muted)] md:text-[1.08rem]">
              Choose a product category to review the items inside it. The
              showroom page stays clean, and the full product list opens only
              when you need it.
            </p>
          </div>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={categoryGridVariants}
          className="mx-auto mt-12 grid max-w-[104rem] grid-cols-1 border-l border-t border-[color:var(--showroom-line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {categoryGroups.map((category) => (
            <motion.button
              key={category.id}
              type="button"
              variants={categoryCardVariants}
              onClick={() => setActiveCategoryId(category.id)}
              className="group relative flex min-h-[28rem] cursor-pointer flex-col overflow-hidden border-b border-r border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] text-left text-[var(--showroom-text)] transition-colors duration-500 hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--showroom-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--showroom-bg)]"
              aria-label={`Open ${category.label} products`}
            >
              <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#ffffff] p-8">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                  className="object-contain p-8 transition duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-8 p-5 md:p-6">
                <div>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)] transition-colors duration-500 group-hover:text-[var(--showroom-inverse-text)] group-hover:opacity-50">
                      {category.index}
                    </span>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)] transition-colors duration-500 group-hover:text-[var(--showroom-inverse-text)] group-hover:opacity-50">
                      {category.count} Products
                    </span>
                  </div>
                  <h3 className="text-[1.55rem] font-black uppercase leading-[0.92] tracking-[-0.05em] md:text-[1.8rem]">
                    {category.label}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--showroom-muted)] transition-colors duration-500 group-hover:text-[var(--showroom-inverse-text)] group-hover:opacity-70">
                    {category.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[color:var(--showroom-line)] pt-5 transition-colors duration-500 group-hover:border-[color:var(--showroom-soft)]">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                    View Products
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-2 w-10 bg-[var(--showroom-text)] transition duration-500 group-hover:translate-x-1 group-hover:bg-[var(--showroom-inverse-text)]"
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <Reveal direction="up" duration={0.75} distance={24} delay={0.12}>
          <div className="mt-10 flex justify-center">
            <InteractiveHoverButton href="#design-specialist" size="sm">
              Book Product Review
            </InteractiveHoverButton>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeCategory ? (
          <PearlCategoryDialog
            category={activeCategory}
            onClose={() => setActiveCategoryId(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function PearlCategoryDialog({
  category,
  onClose,
}: {
  category: CategoryGroup;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/68 px-3 py-5 backdrop-blur-md sm:px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      onClick={onClose}
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pearl-category-dialog-title"
        variants={modalVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative flex max-h-[88svh] w-full max-w-[92rem] flex-col overflow-hidden border border-[color:var(--showroom-line)] bg-[var(--showroom-bg)] text-[var(--showroom-text)] shadow-[0_30px_120px_rgba(0,0,0,0.48)]"
        onClick={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
      >
        <div
          aria-hidden="true"
          className="hidden"
        />

        <div className="relative z-10 flex flex-col gap-6 border-b border-[color:var(--showroom-line)] bg-[var(--showroom-bg)] p-5 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--showroom-soft)]">
              {category.index} / {category.count} products
            </p>
            <h3
              id="pearl-category-dialog-title"
              className="mt-3 text-[2rem] font-black uppercase leading-[0.9] tracking-[-0.055em] sm:text-[3rem] lg:text-[4rem]"
            >
              {category.label}
            </h3>
            <p className="mt-4 max-w-[42rem] text-sm leading-6 text-[var(--showroom-muted)] sm:text-base sm:leading-7">
              {category.summary}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close category products"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[color:var(--showroom-line)] text-2xl leading-none text-[var(--showroom-text)] transition-colors hover:bg-[var(--showroom-inverse)] hover:text-[var(--showroom-inverse-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--showroom-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--showroom-bg)]"
          >
            ×
          </button>
        </div>

        <div
          className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7"
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          <div className="mb-6 flex flex-wrap gap-2">
            {category.sections.map((section) => (
              <span
                key={section}
                className="border border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[var(--showroom-soft)]"
              >
                {section}
              </span>
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={categoryGridVariants}
            className="grid grid-cols-1 border-l border-t border-[color:var(--showroom-line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ product }: { product: PearlProduct }) {
  const status = product.status[0];
  const meta = product.detail || product.finish || product.material || product.brand;

  return (
    <motion.article
      variants={categoryCardVariants}
      className="group relative flex min-h-[23rem] flex-col border-b border-r border-[color:var(--showroom-line)] bg-[var(--showroom-panel)] text-[var(--showroom-text)] transition-colors duration-500 hover:bg-[var(--showroom-bg)]"
    >
      {status ? (
        <span
          className={cn(
            "absolute left-4 top-4 z-10 border px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-500",
            status === "Out of stock"
              ? "border-red-500/35 bg-red-500/10 text-red-600 dark:text-red-300"
              : "border-[color:var(--showroom-line)] bg-[var(--showroom-bg)] text-[var(--showroom-text)] group-hover:border-[color:var(--showroom-inverse-text)] group-hover:bg-[var(--showroom-inverse-text)] group-hover:text-[var(--showroom-inverse)]"
          )}
        >
          {status}
        </span>
      ) : null}

      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#ffffff] p-7 sm:h-64">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
          className="object-contain p-7 transition duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-5">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
              {product.section}
            </span>
            {product.sku ? (
              <span className="text-right text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[var(--showroom-soft)]">
                {product.sku}
              </span>
            ) : null}
          </div>
          <h4 className="text-[1.08rem] font-black uppercase leading-[1] tracking-[-0.035em]">
            {product.name}
          </h4>
          {meta ? (
            <p className="mt-3 text-sm leading-6 text-[var(--showroom-muted)]">
              {meta}
            </p>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-[color:var(--showroom-line)] pt-4 transition-colors duration-500 group-hover:border-[color:var(--showroom-soft)]">
          <p className="text-[1.04rem] font-black uppercase tracking-[-0.03em]">
            {product.price}
          </p>
          <span
            aria-hidden="true"
            className="h-2 w-9 bg-[var(--showroom-text)] transition duration-500 group-hover:translate-x-1"
          />
        </div>
      </div>
    </motion.article>
  );
}
