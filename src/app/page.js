import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Collections from "@/components/Collections";
import TrustedBy from "@/components/TrustedBy";
import CreativeGuidance from "@/components/CreativeGuidance";
import Footer from "@/components/Footer";

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
