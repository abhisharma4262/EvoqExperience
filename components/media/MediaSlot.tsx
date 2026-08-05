import Image from "next/image";
import { cn } from "@/lib/cn";
import type { MediaSlotContent } from "@/content/offerings";

type MediaSlotProps = MediaSlotContent & {
  className?: string;
};

export function MediaSlot({
  src,
  alt,
  aspectRatio = "16 / 10",
  caption,
  className,
}: MediaSlotProps) {
  const hasSrc = Boolean(src && src.trim().length > 0);

  return (
    <figure className={cn("w-full", className)}>
      <div
        className="relative overflow-hidden rounded-2xl border border-accent-alt/15 bg-surface"
        style={{ aspectRatio }}
      >
        {hasSrc ? (
          <Image
            src={src!}
            alt={alt}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg via-bg to-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-bg))] px-6"
            role="img"
            aria-label={alt}
          >
            <p className="max-w-sm text-center text-sm text-text-muted">
              {alt}
            </p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
