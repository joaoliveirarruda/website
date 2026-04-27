import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Universities from "@/components/Universities";
import Footer from "@/components/Footer";
import Tweaks from "@/components/Tweaks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Testimonial />
      <Services />
      <CTA />
      <FAQ />
      <Universities />
      <Footer />
      <Tweaks />
    </main>
  );
}
