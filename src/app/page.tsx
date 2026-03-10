import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Empathy from "@/components/sections/Empathy";
import BrandValues from "@/components/sections/BrandValues";
import ClassSection from "@/components/sections/ClassSection";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Instructor from "@/components/sections/Instructor";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import AnnouncementBanner from "@/components/admin/AnnouncementBanner";

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <Hero />
        <Empathy />
        <BrandValues />
        <ClassSection />
        <Portfolio />
        <Testimonials />
        <Instructor />
        <ContactForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
