import { db } from "@/lib/firebase";
import SiteHeader from "@/components/layout/SiteHeader";
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
import WaveDivider from "@/components/ui/WaveDivider";

const BG      = "#FFFEFB";
const CREAM   = "#F3F8FC";
const WARM    = "#EDE7DC";
const SAND    = "#FAF6EF";
const SAGE    = "#7A8B6A";

async function getSettings(): Promise<Record<string, string>> {
  try {
    const snap = await db.collection("settings").get();
    const s: Record<string, string> = {};
    snap.docs.forEach((doc) => { s[doc.id] = doc.data().value; });
    return s;
  } catch {
    return {};
  }
}

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero
          heroSubtitle={settings["site_hero_subtitle"]}
        />
        <WaveDivider topColor={BG} bottomColor={CREAM} />
        <Empathy />
        <WaveDivider topColor={CREAM} bottomColor={BG}    flip    />
        <BrandValues />
        <WaveDivider topColor={BG}    bottomColor={CREAM}         />
        <ClassSection />
        <WaveDivider topColor={CREAM} bottomColor={WARM}  flip    />
        <Portfolio />
        <WaveDivider topColor={WARM}  bottomColor={SAND}          />
        <Testimonials />
        <WaveDivider topColor={SAND}  bottomColor={WARM}  flip    />
        <Instructor
          name={settings["site_instructor_name"]}
          titlePrefix={settings["site_instructor_title_prefix"]}
          bio={settings["site_instructor_bio"]}
          quote={settings["site_instructor_quote"]}
          strengths={settings["site_instructor_strengths"]}
        />
        <WaveDivider topColor={WARM}  bottomColor={SAND}          />
        <ContactForm
          heading={settings["site_contact_heading"]}
          subtitle={settings["site_contact_subtitle"]}
        />
        <WaveDivider topColor={SAND}  bottomColor={WARM}  flip    />
        <FAQ />
        <WaveDivider topColor={WARM}  bottomColor={SAGE}          />
        <FinalCTA
          heading={settings["site_cta_heading"]}
          subtitle={settings["site_cta_subtitle"]}
        />
      </main>
      <Footer />
    </>
  );
}
