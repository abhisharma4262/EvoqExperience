import { BrandLogo } from "@/components/brand/BrandLogo";

export default function PrivacyPage() {
  return (
    <main className="film-container py-24">
      <BrandLogo href="/" surface="light" compact />
      <h1 className="display mt-10 text-4xl">Privacy</h1>
      <p className="mt-6 max-w-2xl text-text-secondary">
        Placeholder privacy policy. Replace this stub with the official privacy
        notice before production launch.
      </p>
    </main>
  );
}
