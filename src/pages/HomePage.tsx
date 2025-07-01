import { Link } from "react-router-dom";
import { ArrowRight,  Sparkles } from "lucide-react";
import { howItWorksSteps } from "../constants/howitwork";
import { featuredEvents } from "../constants/featuredEvent";
import { statsConst } from "../constants/stats";
import { supportOptions } from "../constants/supportOptions";
import { sponsors } from "../constants/sponsor";
import { IHowItWorksStep, IFeaturedEvent } from "../types/constType";
import CardEvent from "../components/CardEvent";
import FrequentlyAQ from "../components/FrequentlyAQ";
import Testimonials from "../components/Testimonials";
import OurVision from "../components/OurVision";
import QuoteBanner from "../components/QuoteBanner";

export default function HomePage() {


  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-10 w-32 h-32 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-sm px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
            Platform Edukasi Web3 Terpercaya
          </div>

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-8 leading-tight">
            Lets Commit!
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            Platform pembelajaran berbasis komitmen yang mengamankan organizer
            dan peserta melalui sistem{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              escrow smart contract
            </span>{" "}
            dengan reward berbasis sesi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/explore"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Jelajahi Event
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 backdrop-blur-sm">
              Cara Kerja
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Platform Terpercaya dengan Hasil Nyata
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Bergabung dengan ribuan learner yang telah merasakan manfaat
              sistem commitment-based learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsConst.map((stat, i) => (
              <div
                key={i}
                className="group relative p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {stat.description}
                  </p>
                  <p
                    className={`text-sm font-medium text-${
                      stat.variant === "green" ? "green" : stat.variant
                    }-600 dark:text-${
                      stat.variant === "green" ? "green" : stat.variant
                    }-400`}
                  >
                    {stat.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>






      {/* Quote Banner - Enhanced */}
        <QuoteBanner />

      {/* How It Works - Enhanced */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Sistem sederhana namun efektif untuk memastikan komitmen dan hasil
              pembelajaran yang optimal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((item: IHowItWorksStep, index) => (
              <div
                key={item.step}
                className="group relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                {/* Step connector line for desktop */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}

                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Testimonials */}
      <Testimonials />

      {/* Support Us & Sponsors Section - Enhanced */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          {/* Support Us */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg">
              <Sparkles className="w-4 h-4" />
              Support Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Dukung Misi Kami
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
              Bantu kami terus mengembangkan platform pembelajaran terbaik dan
              memberikan dampak positif bagi komunitas
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  <div
                    className={`w-16 h-16 ${option.color} rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {option.description}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-6">
                    {option.amount}
                  </p>
                  <Link
                    to={option.link}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Mulai Dukung
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Thanks to Sponsors - Continued and Enhanced */}
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terima Kasih kepada Sponsor Kami
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Dukungan mereka memungkinkan kami untuk terus berinovasi dan
              memberikan yang terbaik
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center mb-12">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="group cursor-pointer"
                  onClick={() => window.open(sponsor.website, "_blank")}
                >
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105 group-hover:-translate-y-1">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-12 object-contain mb-3 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-medium">
                      {sponsor.tier}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/sponsorship"
                className="group inline-flex items-center px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                Ingin Menjadi Sponsor?
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* faqs */}
      <FrequentlyAQ />
    </>
  );
}
