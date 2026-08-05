"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Heart,
  MapPin,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";

type PreviewVariant = "default" | "enhanced";

const rooms = [
  {
    name: "Harbor Suite",
    meta: "42 m² · Sea view · King",
    amenities: ["Ocean balcony", "Rain shower", "Late checkout"],
    price: 318,
    was: 389,
    tag: "Member rate",
    rating: 4.9,
    reviews: 128,
    image: "/studio/aurora/harbor.jpg",
    imageAlt: "Harbor Suite with sea view and king bed",
  },
  {
    name: "Courtyard Deluxe",
    meta: "36 m² · Courtyard · Twin",
    amenities: ["Quiet wing", "Workspace", "Flexible cancel"],
    price: 246,
    was: 279,
    tag: "Flexible",
    rating: 4.7,
    reviews: 86,
    image: "/studio/aurora/courtyard.jpg",
    imageAlt: "Courtyard Deluxe room with twin beds",
  },
  {
    name: "Penthouse Loft",
    meta: "68 m² · Terrace · King",
    amenities: ["Private terrace", "Butler hour", "Spa credit"],
    price: 512,
    was: 620,
    tag: "Exclusive",
    rating: 5.0,
    reviews: 41,
    image: "/studio/aurora/loft.jpg",
    imageAlt: "Penthouse loft with terrace seating",
  },
] as const;

const guestAvatars = [
  { src: "/studio/aurora/guest-1.jpg", alt: "Guest review avatar" },
  { src: "/studio/aurora/guest-2.jpg", alt: "Guest review avatar" },
  { src: "/studio/aurora/guest-3.jpg", alt: "Guest review avatar" },
] as const;

const paymentMarks = [
  { src: "/studio/aurora/pay-visa.svg", alt: "Visa" },
  { src: "/studio/aurora/pay-mastercard.svg", alt: "Mastercard" },
  { src: "/studio/aurora/pay-amex.svg", alt: "American Express" },
] as const;

function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  return Math.max(diff, 1);
}

export function BookingAppPreview({
  variant = "default",
  device = "desktop",
}: {
  variant?: PreviewVariant;
  device?: "desktop" | "tablet" | "mobile";
}) {
  const [checkIn, setCheckIn] = useState("2026-09-12");
  const [checkOut, setCheckOut] = useState("2026-09-15");
  const [guests, setGuests] = useState(2);
  const [selected, setSelected] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([0]);
  const [booked, setBooked] = useState(false);
  const [searchPulse, setSearchPulse] = useState(false);

  const nights = useMemo(
    () => nightsBetween(checkIn, checkOut),
    [checkIn, checkOut],
  );
  const active = rooms[selected] ?? rooms[0];
  const total = active.price * nights;

  const runSearch = () => {
    setBooked(false);
    setSearchPulse(true);
    window.setTimeout(() => setSearchPulse(false), 700);
  };

  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div
      className={cn(
        "aurora-glass mx-auto h-full overflow-hidden text-[#0c2226]",
        device === "desktop" && "w-full rounded-none",
        device === "tablet" && "max-w-[720px] rounded-2xl",
        device === "mobile" && "max-w-[390px] rounded-[1.75rem]",
      )}
    >
      <div className="aurora-glass__chrome flex h-9 items-center gap-2 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
        <span className="ml-3 truncate font-mono text-[11px] text-[#194247]/70">
          aurora-direct.evoq.app
        </span>
        <span className="ml-auto hidden items-center gap-1 rounded-full border border-white/40 bg-white/35 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#096b5c] sm:inline-flex">
          <Sparkles className="h-3 w-3" />
          Live preview
        </span>
      </div>

      <div className="aurora-glass__scroll h-[calc(100%-2.25rem)] overflow-y-auto">
        <header className="aurora-glass__nav sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/studio/aurora/logo.svg"
              alt="Aurora Hotels"
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-[0.7rem] shadow-sm"
              priority
            />
            <div className="min-w-0">
              <Image
                src="/studio/aurora/wordmark.svg"
                alt=""
                width={96}
                height={22}
                className="h-4 w-auto"
              />
              <p className="truncate text-[11px] font-medium text-[#556670]">
                Direct · No OTA fees
              </p>
            </div>
          </div>
          {variant === "enhanced" ? (
            <span className="aurora-glass__chip shrink-0">Multi-leg planner</span>
          ) : (
            <button type="button" className="aurora-glass__chip shrink-0">
              My trips
            </button>
          )}
        </header>

        <section className="aurora-glass__hero relative mx-3 mt-3 overflow-hidden rounded-[1.35rem] sm:mx-4">
          <Image
            src="/studio/aurora/hero.jpg"
            alt="Aurora Lisbon waterfront hotel"
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
          <div className="aurora-glass__hero-scrim" aria-hidden />
          <div className="aurora-glass__hero-glow" aria-hidden />
          <div className="aurora-glass__hero-glow aurora-glass__hero-glow--b" aria-hidden />
          <div className="relative z-10 px-5 pb-5 pt-7 sm:px-6 sm:pt-8">
            <p className="aurora-glass__chip inline-flex bg-white/20 text-white">
              <MapPin className="h-3 w-3" />
              Lisbon waterfront
            </p>
            <h2 className="display mt-4 max-w-lg text-[1.85rem] leading-[1.05] text-white sm:text-[2.35rem]">
              Book direct.
              <br />
              Keep the margin.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
              Plan stays, connect multi-city legs, and manage the trip — without
              the OTA tax.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {guestAvatars.map((guest) => (
                  <Image
                    key={guest.src}
                    src={guest.src}
                    alt={guest.alt}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full border-2 border-white/70 object-cover"
                  />
                ))}
              </div>
              <p className="text-xs text-white/80">
                <span className="font-semibold text-white">4.9</span> from
                recent direct guests
              </p>
            </div>

            <div
              className={cn(
                "aurora-glass__search mt-6 grid gap-3 p-3 sm:grid-cols-[1.1fr_1.1fr_0.85fr_auto] sm:p-3.5",
                searchPulse && "aurora-glass__search--pulse",
              )}
            >
              <label className="aurora-glass__field">
                <span>
                  <CalendarDays className="h-3 w-3" />
                  Check in
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    setBooked(false);
                  }}
                />
              </label>
              <label className="aurora-glass__field">
                <span>
                  <CalendarDays className="h-3 w-3" />
                  Check out
                </span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setBooked(false);
                  }}
                />
              </label>
              <label className="aurora-glass__field">
                <span>
                  <Users className="h-3 w-3" />
                  Guests
                </span>
                <select
                  value={guests}
                  onChange={(e) => {
                    setGuests(Number(e.target.value));
                    setBooked(false);
                  }}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} guest{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={runSearch}
                className="aurora-glass__cta self-end"
              >
                Search stays
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4 px-3 py-5 sm:px-4">
          <div className="flex flex-wrap items-end justify-between gap-3 px-1">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Available rooms
              </h3>
              <p className="mt-0.5 text-sm text-[#556670]">
                {nights} night{nights > 1 ? "s" : ""} · {guests} guests ·{" "}
                {checkIn} → {checkOut}
              </p>
            </div>
            {variant === "enhanced" ? (
              <button
                type="button"
                className="text-xs font-medium text-[#096b5c] transition hover:text-[#0c2226]"
              >
                + Add another city leg
              </button>
            ) : (
              <p className="text-xs text-[#556670]">
                {favorites.length} saved · member rates on
              </p>
            )}
          </div>

          <div className="space-y-3">
            {rooms.map((room, index) => {
              const isSelected = selected === index;
              const isFav = favorites.includes(index);
              return (
                <article
                  key={room.name}
                  className={cn(
                    "aurora-glass__room group",
                    isSelected && "aurora-glass__room--selected",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(index);
                      setBooked(false);
                    }}
                    className="flex w-full flex-col gap-4 p-3 text-left sm:flex-row sm:items-stretch"
                  >
                    <div className="aurora-glass__room-visual relative overflow-hidden rounded-2xl sm:w-[10.5rem]">
                      <Image
                        src={room.image}
                        alt={room.imageAlt}
                        fill
                        sizes="180px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                      <div className="absolute inset-0 aurora-glass__shimmer pointer-events-none" />
                      <div className="relative z-10 flex h-full min-h-[8rem] flex-col justify-between p-3 text-white">
                        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-black/35 px-2 py-0.5 text-[10px] backdrop-blur-md">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          {room.rating}
                        </span>
                        <p className="text-[11px] text-white/85">
                          {room.reviews} reviews
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 pr-8">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold tracking-tight">
                            {room.name}
                          </p>
                          <p className="mt-1 text-sm text-[#556670]">
                            {room.meta}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-[#556670] line-through">
                            ${room.was}
                          </p>
                          <p className="text-xl font-semibold tracking-tight">
                            ${room.price}
                          </p>
                          <p className="text-[11px] text-[#556670]">per night</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="aurora-glass__pill">{room.tag}</span>
                        {room.amenities.map((item) => (
                          <span
                            key={item}
                            className="aurora-glass__pill aurora-glass__pill--muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {isSelected ? (
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#096b5c]">
                            <Check className="h-3.5 w-3.5" />
                            Selected · ${total} for {nights} nights
                          </p>
                          <div className="flex -space-x-1.5">
                            {guestAvatars.map((guest) => (
                              <Image
                                key={`${room.name}-${guest.src}`}
                                src={guest.src}
                                alt=""
                                width={22}
                                height={22}
                                className="h-[22px] w-[22px] rounded-full border border-white object-cover"
                              />
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </button>

                  <button
                    type="button"
                    aria-label={
                      isFav ? `Unsave ${room.name}` : `Save ${room.name}`
                    }
                    onClick={() => toggleFavorite(index)}
                    className={cn(
                      "aurora-glass__fav absolute right-3 top-3",
                      isFav && "aurora-glass__fav--on",
                    )}
                  >
                    <Heart
                      className={cn("h-3.5 w-3.5", isFav && "fill-current")}
                    />
                  </button>
                </article>
              );
            })}
          </div>

          <div className="aurora-glass__checkout sticky bottom-2 z-10 p-3 sm:p-3.5">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={active.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{active.name}</p>
                  <p className="text-xs text-[#556670]">
                    {nights} nights · {guests} guests · no OTA fee
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold tracking-tight">${total}</p>
            </div>
            <button
              type="button"
              onClick={() => setBooked(true)}
              className="aurora-glass__cta aurora-glass__cta--solid w-full"
            >
              {booked
                ? `Reserved · ${active.name}`
                : `Continue with ${active.name}`}
            </button>

            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <p className="text-[11px] text-[#556670]">Secure checkout</p>
              <div className="flex items-center gap-1.5">
                {paymentMarks.map((mark) => (
                  <Image
                    key={mark.src}
                    src={mark.src}
                    alt={mark.alt}
                    width={40}
                    height={24}
                    className="h-6 w-auto rounded-[4px] shadow-sm"
                  />
                ))}
              </div>
            </div>

            {booked ? (
              <div className="aurora-glass__confirm mt-3 p-3 text-sm">
                <p className="font-semibold text-[#096b5c]">Hold confirmed</p>
                <p className="mt-1 text-[#194247]/90">
                  Itinerary saved to My trips. Payment authorization pending
                  guest confirmation — no OTA commission applied.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
