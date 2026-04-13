import Image from "next/image";

type GalleryLightboxItem = {
  image: string;
  alt: string;
  category: string;
  title: string;
};

export function GalleryLightboxOverlay({
  item,
  onClose,
}: {
  item: GalleryLightboxItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[140] bg-black/92 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="mx-auto flex h-full max-w-[94rem] flex-col">
        <div className="mb-4 flex items-start justify-between gap-4 text-white">
          <div>
            <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/62">
              {item.category}
            </p>
            <p className="text-[1rem] font-semibold tracking-[-0.02em] sm:text-[1.15rem]">
              {item.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/78 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Close
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1 overflow-hidden"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            quality={90}
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
