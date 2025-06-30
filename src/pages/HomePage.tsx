import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote, Sparkles, CheckCircle } from "lucide-react";
import { howItWorksSteps } from "../constants/howitwork";
import { featuredEvents } from "../constants/featuredEvent";
import { faqs } from "../constants/faqs";
import { visionPoints } from "../constants/visionpoints";
import { statsConst } from "../constants/stats";
import { useState } from "react";
import { testimonials } from "../constants/testimonials";
import { supportOptions } from "../constants/supportOptions";
import { sponsors } from "../constants/sponsor";
import { IHowItWorksStep, IFeaturedEvent } from "../types/constType";

export default function HomePage() {
  // State untuk melacak FAQ yang terbuka
  const [openFAQ, setOpenFAQ] = useState(null);

  // Fungsi untuk menangani toggle FAQ
  const toggleFAQ = (id) => {
    if (openFAQ === id) {
      setOpenFAQ(null); // Tutup jika sudah terbuka
    } else {
      setOpenFAQ(id); // Buka FAQ yang dipilih
    }
  };

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

      {/* Vision Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-sm px-4 py-2 rounded-full font-medium shadow-lg">
              <Sparkles className="w-4 h-4" />
              Our Vision
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              Masa Depan Pembelajaran yang{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Berkomitmen
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Kami percaya bahwa pembelajaran terbaik terjadi ketika ada
              komitmen nyata. Dengan menggabungkan teknologi blockchain dan
              psikologi behavioral, kami menciptakan ekosistem di mana setiap
              orang dapat mencapai potensi maksimal mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {visionPoints.map((point, index) => (
              <div
                key={index}
                className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 dark:border-gray-700/50"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <point.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {point.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20 dark:border-gray-700/50">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                "Komitmen adalah jembatan antara{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  impian dan pencapaian
                </span>
                "
              </h3>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Melalui LetsCommit, kami tidak hanya menyediakan platform
                pembelajaran, tetapi membangun gerakan global untuk menciptakan
                budaya pembelajaran yang berkomitmen dan berkelanjutan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/join-community"
                  className="px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  Bergabung dengan Komunitas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl p-16 md:p-24 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-black max-w-5xl mx-auto leading-tight">
                Commit to Win - Get your money back by completing what you
                started.
              </h2>
            </div>
          </div>
        </div>
      </section>

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
              <div
                key={event.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
                      {event.category}
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Cashback
                      </p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${event.potentialCashback}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    by {event.organizer}
                  </p>
                </div>

                <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Total Cost:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${event.totalCost}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Commitment Fee:
                      </span>
                      <span className="font-semibold text-orange-600 dark:text-orange-400">
                        ${event.commitmentFee}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="#"
                  className="block w-full text-center py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 group-hover:shadow-lg"
                >
                  Daftar Sekarang
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-sm px-4 py-2 rounded-full font-medium shadow-lg">
              <Star className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Apa Kata Mereka?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Dengarkan pengalaman nyata dari learners yang telah merasakan
              manfaat sistem commitment-based learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-2xl object-cover mr-4 ring-4 ring-gray-100 dark:ring-gray-700"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-10 h-10 text-blue-500/20 dark:text-blue-400/20" />
                  <p className="text-gray-700 dark:text-gray-300 italic pl-8 leading-relaxed text-lg">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                      {testimonial.course}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/testimonials"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Lihat Semua Testimoni
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

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

      {/* FAQ - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-sm px-4 py-2 rounded-full font-medium shadow-lg">
              <CheckCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Temukan jawaban atas pertanyaan yang sering diajukan seputar
              LetsCommit!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="group mb-6 last:mb-0">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div
                    className="flex justify-between items-center p-6 md:p-8 cursor-pointer group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 transition-colors duration-300"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`flex-shrink-0 p-2 rounded-xl transition-all duration-300 ${
                        openFAQ === faq.id
                          ? "bg-blue-100 dark:bg-blue-900/30 rotate-180"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      }`}
                    >
                      <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openFAQ === faq.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="pl-12 border-l-4 border-blue-200 dark:border-blue-800">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA at bottom of FAQ */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <p className="text-gray-600 dark:text-gray-400">
                Masih ada pertanyaan?
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Hubungi Kami
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section - New Enhanced Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Siap Memulai Perjalanan{" "}
              <span className="text-yellow-300">Commitment-Based Learning</span>
              ?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              Bergabunglah dengan ribuan learner yang telah membuktikan bahwa
              komitmen adalah kunci kesuksesan dalam pembelajaran.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                to="/register"
                className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Mulai Sekarang
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/explore"
                className="group inline-flex items-center px-10 py-5 border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg backdrop-blur-sm"
              >
                Jelajahi Event
                <Sparkles className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 opacity-80">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-sm opacity-75">Learners Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-75">Tingkat Penyelesaian</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">$2M+</div>
                <div className="text-sm opacity-75">Cashback Dibagikan</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
