import { Navbar, Hero, Features, Gallery, Collections, TrustedBy, CreativeGuidance, Footer } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
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
