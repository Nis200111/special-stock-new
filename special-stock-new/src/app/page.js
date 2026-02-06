import { Navbar, Hero, Features, Gallery, Collections, TrustedBy, CreativeGuidance, Footer, TopBanner } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Announcement */}
      {/* Top Announcement */}
      <TopBanner />

      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Collections />
      <TrustedBy />
      <CreativeGuidance />
      <Footer />
    </main>
  );
}
