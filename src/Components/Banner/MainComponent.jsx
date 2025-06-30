import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingBag, Shield, Truck } from "lucide-react";

const MainComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const nav = useNavigate();

  const slides = [
    {
      title: "XPERFUME",
      subtitle: "Signature Collection",
      description:
        "Where elegance meets essence — discover your perfect fragrance story",
      accent: "New Arrivals",
    },
    {
      title: "XPERFUME",
      subtitle: "Luxury Editions",
      description:
        "Handcrafted perfumes that capture the essence of sophistication",
      accent: "Limited Edition",
    },
    {
      title: "XPERFUME",
      subtitle: "Premium Selection",
      description:
        "Fresh scents that define modern luxury and timeless elegance",
      accent: "Best Sellers",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  const handleExploreClick = () => {
    nav("/products");
  };

  return (
    <section className="relative bg-[url('/banner2.jpg')] bg-cover bg-center w-full mx-auto min-h-[100dvh]   lg:h-screen overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0  scale-110 transition-transform duration-[10s] ease-out" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-black rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/15 to-black rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center h-full">
            <div className="lg:col-span-7 space-y-8">
              <div
                className={`transform transition-all duration-1000 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                {/* Premium Badge */}
                <div className="inline-flex items-center gap-3 bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-full px-6 py-3 mb-6 shadow-sm">
                  <Star className="w-5 h-5 text-blue-500 fill-current" />
                  <span className="text-gray-800 font-medium text-sm tracking-wide">
                    {currentSlideData.accent}
                  </span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                </div>

             
                <div className="space-y-4 mb-8">
                  <h1 className="text-7xl font-thin text-gray-900 tracking-tighter leading-none">
                    {currentSlideData.title}
                  </h1>
                  <h2 className="text-3xl lg:text-4xl text-transparent bg-gradient-to-r from-blue-500 via-black-500 to-blue-400 bg-clip-text font-light tracking-widest">
                    {currentSlideData.subtitle}
                  </h2>
                </div>

      
                <p className="text-gray-800 text-xl lg:text-2xl leading-relaxed max-w-2xl font-light mb-10">
                  {currentSlideData.description}
                </p>

                <div className="flex items-center gap-12 mb-12">
                  <div className="text-center">
                    <div className="text-4xl font-light text-gray-900 mb-1">
                      50+
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      Unique Scents
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-300" />
                  <div className="text-center">
                    <div className="text-4xl font-light text-gray-900 mb-1">
                      4.9
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      Rating
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-300" />
                  <div className="text-center">
                    <div className="text-4xl font-light text-gray-900 mb-1">
                      24h
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      Delivery
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={handleExploreClick}
                    className="group relative bg-gray-900 text-white px-10 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-2xl flex items-center gap-3 justify-center"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Explore Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className={`transform transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-12 opacity-0"
                }`}
              >
             
                <div className="space-y-4">
                  <div className="group bg-white/80 hover:cursor-pointer backdrop-blur-xl border border-gray-200 rounded-3xl p-5 transition-all duration-500 hover:bg-white hover:border-gray-300 hover:scale-105 hover:shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-black-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Truck className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-semibold text-xl mb-2">
                          Free Worldwide Shipping
                        </h3>
                        <p className="text-gray-600 text-base">
                          On all orders over $75
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/80 hover:cursor-pointer backdrop-blur-xl border border-gray-200 rounded-3xl p-5 transition-all duration-500 hover:bg-white hover:border-gray-300 hover:scale-105 hover:shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-semibold text-xl mb-2">
                          Authenticity Guarantee
                        </h3>
                        <p className="text-gray-600 text-base">
                          100% genuine luxury fragrances
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/80 hover:cursor-pointer backdrop-blur-xl border border-gray-200 rounded-3xl p-5 transition-all duration-500 hover:bg-white hover:border-gray-300 hover:scale-105 hover:shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Star className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-semibold text-xl mb-2">
                          Premium Quality
                        </h3>
                        <p className="text-gray-600 text-base">
                          Curated luxury fragrance collection
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide  */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-gray-800 scale-125 shadow-lg"
                  : "bg-gray-400 hover:bg-gray-600 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>

  
    </section>
  );
};

export default MainComponent;
