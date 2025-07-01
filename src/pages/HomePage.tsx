import { Link } from "react-router-dom";
import { ArrowRight} from "lucide-react";
import { featuredEvents } from "../constants/featuredEvent";
import { IFeaturedEvent } from "../types/constType";
import CardEvent from "../components/CardEvent";
import FrequentlyAQ from "../components/FrequentlyAQ";
import Testimonials from "../components/Testimonials";
import OurVision from "../components/OurVision";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import HowItWork from "../components/HowItWork";
import SupportUs from "../components/SupportUs";

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

      {/* Featured Events - Enhanced */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Event Pilihan
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Event terbaik dengan tingkat commitment tinggi dan reward
                menarik
              </p>
            </div>
            <Link
              to="/discover"
              className="group inline-flex items-center px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              Lihat Semua
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event: IFeaturedEvent) => (
                <CardEvent
                    key={event.id} 
                    event={event}
                />
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <OurVision />

      {/* Support Us & Sponsors Section - Enhanced */}
      <SupportUs />

      {/* faqs */}
      <FrequentlyAQ />
    </>
  );
}
