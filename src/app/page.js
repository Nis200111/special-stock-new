import { Navbar, Hero, Features, Gallery, Collections, TrustedBy, CreativeGuidance, Footer } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Announcement */}
      <div className="bg-[#3477a2] text-white text-center text-small sm:text-sm py-1 sm:py-1.99 px-2 tracking-[0.02rem]">
        <span className="block sm:inline">
          Get 10 royalty-free image downloads each month with a cost-saving subscription.
        </span>
        <Link
          href="/register"
          className="bg-white text-black px-2 py-2 rounded-full ml-0 sm:ml-2 mt-2 sm:mt-0 text-xs font-bold hover:bg-gray-100 transition-colors inline-block"
        >
          Buy Now
        </Link>
      </div>

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
