import FrequentlyAQ from "../components/FrequentlyAQ";
import Testimonials from "../components/Testimonials";
import OurVision from "../components/OurVision";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import HowItWork from "../components/HowItWork";
import SupportUs from "../components/SupportUs";
import FeaturedEvent from "../components/FeaturedEvent";

export default function HomePage() {


  return (
    <>
      {/* Hero Section - Enhanced */}
      <HeroSection />

      {/* Stats Section - Enhanced */}
      <StatsSection />

      {/* How It Works - Enhanced */}
      <HowItWork />

      {/* Testimonials */}
      <Testimonials />

      {/* Featured Events - Enhanced Design */}
      <FeaturedEvent />

      {/* Our Vision */}
      <OurVision />

      {/* Support Us & Sponsors Section - Enhanced */}
      <SupportUs />

      {/* faqs */}
      <FrequentlyAQ />
    </>
  );
}
