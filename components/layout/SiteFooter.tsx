import { navigation } from "@/content/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="band-dark">
      <div className="film-container grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo
            href="/"
            surface="dark"
            className="h-9 max-w-[10rem] sm:h-10 sm:max-w-[12rem]"
          />
          <p className="mt-4 max-w-sm text-sm text-on-dark/70">
            {navigation.footer.positioning}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {navigation.footer.columns.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-on-dark/80 link-sweep w-fit"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {navigation.footer.legal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-on-dark/60 link-sweep w-fit"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
