// src/pages/HomePage.tsx

import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";
import { howItWorksSteps, IHowItWorksStep } from "../constants/howitwork";
import { featuredEvents, IFeaturedEvent } from "../constants/featuredEvent";
import { faqs } from "../constants/faqs";
import { visionPoints } from "../constants/visionpoints";
import { statsConst } from "../constants/stats";
import  { useState } from 'react'; 
import { testimonials } from "../constants/testimonials";
import { supportOptions } from "../constants/supportOptions";
import { sponsors } from "../constants/sponsor";

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
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-commitment-blue/10 to-light-blue/10 opacity-10" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <span className="inline-block mb-4 bg-light-blue text-commitment-blue border border-commitment-blue/20 text-sm px-3 py-1 rounded-full">
            Platform Edukasi Web3 Terpercaya
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-deep-navy dark:text-foreground mb-6">
            Lets Commit!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Platform pembelajaran berbasis komitmen yang mengamankan organizer dan peserta
            melalui sistem escrow smart contract dengan reward berbasis sesi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-commitment-blue to-light-blue text-white font-medium rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Jelajahi Event <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="px-8 py-3 border-2 border-commitment-blue text-commitment-blue font-medium rounded-lg hover:bg-light-blue/10 transition-all duration-200">
              Cara Kerja
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-deep-navy dark:text-foreground mb-4">
            Platform Terpercaya dengan Hasil Nyata
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Bergabung dengan ribuan learner yang telah merasakan manfaat sistem commitment-based learning
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsConst.map((stat, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <stat.icon className="mx-auto mb-4 w-12 h-12 text-commitment-blue" />
                <h3 className="text-xl font-medium text-deep-navy dark:text-foreground">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-deep-navy dark:text-foreground mt-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{stat.description}</p>
                <p className={`mt-2 text-${stat.variant}`}>{stat.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-br from-commitment-blue/5 to-light-blue/5 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 bg-commitment-blue/10 text-commitment-blue text-sm px-3 py-1 rounded-full font-medium">
              Our Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy dark:text-foreground mb-6">
              Masa Depan Pembelajaran yang Berkomitmen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Kami percaya bahwa pembelajaran terbaik terjadi ketika ada komitmen nyata. 
              Dengan menggabungkan teknologi blockchain dan psikologi behavioral, 
              kami menciptakan ekosistem di mana setiap orang dapat mencapai potensi maksimal mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {visionPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-commitment-blue to-light-blue rounded-xl flex items-center justify-center shadow-md">
                    <point.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-deep-navy dark:text-foreground mb-3">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-deep-navy dark:text-foreground mb-6">
                "Komitmen adalah jembatan antara impian dan pencapaian"
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Melalui LetsCommit, kami tidak hanya menyediakan platform pembelajaran, 
                tetapi membangun gerakan global untuk menciptakan budaya pembelajaran yang berkomitmen dan berkelanjutan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-commitment-blue to-light-blue text-white font-medium rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Pelajari Lebih Lanjut <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/join-community"
                  className="px-8 py-3 border-2 border-commitment-blue text-commitment-blue font-medium rounded-lg hover:bg-light-blue/10 transition-all duration-200"
                >
                  Bergabung dengan Komunitas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="mt-14 md:mt-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-xl p-12 md:p-20 text-center text-white shadow-2xl">
            <h2 className="text-2xl md:text-5xl font-bold max-w-3xl mx-auto">
              Commit to Win - Get your money back by completing what you started.
            </h2>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-deep-navy dark:text-foreground mb-4">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Sistem sederhana namun efektif untuk memastikan komitmen dan hasil pembelajaran yang optimal
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((item: IHowItWorksStep) => (
              <div
                key={item.step}
                className="bg-white dark:bg-gray-900 rounded-xl hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center pt-6 pb-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-commitment-blue to-light-blue rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className=" w-8 h-8 bg-commitment-blue text-white rounded-full flex items-center justify-center font-bold mb-2">
                    {item.step}
                  </span>
                  <h3 className="text-xl text-deep-navy dark:text-foreground font-medium">
                    {item.title}
                  </h3>
                </div>
                <div className="px-4 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold text-deep-navy dark:text-foreground mb-2">
                Event Pilihan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Event terbaik dengan tingkat commitment tinggi dan reward menarik
              </p>
            </div>
            <Link
              to="/discover"
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-2 border-2 border-commitment-blue text-commitment-blue font-medium rounded-lg hover:bg-light-blue/10 transition-all duration-200"
            >
              Lihat Semua <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event: IFeaturedEvent) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-3 py-1 bg-commitment-blue/10 text-commitment-blue text-xs font-medium rounded-full">
                      {event.category}
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Cashback</p>
                      <p className="text-lg font-bold text-green-600">${event.potentialCashback}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-deep-navy dark:text-foreground leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    by {event.organizer}
                  </p>
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                    <span className="font-semibold text-deep-navy dark:text-foreground">${event.totalCost}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600 dark:text-gray-400">Commitment Fee:</span>
                    <span className="font-semibold text-orange-600">${event.commitmentFee}</span >
                  </div>
                </div>
                <Link
                  to="#"
                  className="block w-full text-center py-3 bg-gradient-to-r from-commitment-blue to-light-blue text-white font-medium hover:scale-[1.02] transition-transform duration-200"
                >
                  Daftar Sekarang
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 bg-commitment-blue/10 text-commitment-blue text-sm px-3 py-1 rounded-full font-medium">
              Testimonials
            </span>
            <h2 className="text-3xl font-semibold text-deep-navy dark:text-foreground mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dengarkan pengalaman nyata dari learners yang telah merasakan manfaat sistem commitment-based learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-deep-navy dark:text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-commitment-blue/20" />
                  <p className="text-gray-600 dark:text-gray-400 italic pl-6">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-commitment-blue font-medium">
                    {testimonial.course}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-commitment-blue to-light-blue text-white font-medium rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Lihat Semua Testimoni <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Support Us & Sponsors Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          {/* Support Us */}
          <div className="text-center mb-16">
            <span className="inline-block mb-4 bg-commitment-blue/10 text-commitment-blue text-sm px-3 py-1 rounded-full font-medium">
              Support Us
            </span>
            <h2 className="text-3xl font-semibold text-deep-navy dark:text-foreground mb-4">
              Dukung Misi Kami
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Bantu kami terus mengembangkan platform pembelajaran terbaik dan memberikan dampak positif bagi komunitas
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-deep-navy dark:text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {option.description}
                  </p>
                  <p className="text-commitment-blue font-semibold mb-4">
                    {option.amount}
                  </p>
                  <Link
                    to={option.link}
                    className="inline-flex items-center justify-center w-full px-6 py-2 bg-gradient-to-r from-commitment-blue to-light-blue text-white font-medium rounded-lg hover:scale-105 transition-all duration-200"
                  >
                    Mulai Dukung
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Thanks to Sponsors */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-deep-navy dark:text-foreground mb-2">
              Terima Kasih kepada Sponsor Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Dukungan mereka memungkinkan kami untuk terus berinovasi dan memberikan yang terbaik
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="group cursor-pointer"
                  onClick={() => window.open(sponsor.website, '_blank')}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:scale-105">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-12 object-contain mb-2 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-commitment-blue transition-colors duration-300">
                      {sponsor.tier}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/sponsorship"
                className="inline-flex items-center px-6 py-2 border-2 border-commitment-blue text-commitment-blue font-medium rounded-lg hover:bg-light-blue/10 transition-all duration-200"
              >
                Ingin Menjadi Sponsor? <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-deep-navy dark:text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Temukan jawaban atas pertanyaan yang sering diajukan seputar LetsCommit!
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mb-4"
              >
                <div
                  className="flex justify-between items-center p-5 cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <h3 className="text-lg font-semibold text-deep-navy dark:text-foreground">
                    {faq.question}
                  </h3>
                  <span
                    className={`transition-transform duration-300 ${
                      openFAQ === faq.id ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ArrowRight className="w-6 h-6 text-deep-navy dark:text-gray-300" />
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === faq.id ? "max-h-96 p-5" : "max-h-0 p-0"
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}