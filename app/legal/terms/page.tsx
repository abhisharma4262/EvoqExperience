import { BrandLogo } from "@/components/brand/BrandLogo";

export default function TermsPage() {
  return (
    <main className="film-container py-24">
      <BrandLogo href="/" surface="light" compact />
      <h1 className="display mt-10 text-4xl">Terms</h1>
      <p className="mt-6 max-w-2xl text-text-secondary">
        Placeholder terms of use. Replace this stub with the official terms
        before production launch.
      </p>
    </main>
  );
}
