"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiServer, FiCpu, FiGlobe, FiCode, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/button";
import Marquee from "react-fast-marquee";
import { Footer } from "./components/footer";
import Lenis from "@studio-freight/lenis";
import { Separator } from "@radix-ui/react-separator";
import { toast, Toaster } from "react-hot-toast";
import { create } from "zustand";

interface ProductState {
  currentProductIndex: number;
  setCurrentProductIndex: (index: number) => void;
}

const useProductStore = create<ProductState>((set) => ({
  currentProductIndex: 0,
  setCurrentProductIndex: (index) => set({ currentProductIndex: index }),
}));

export default function Home() {
  const { currentProductIndex, setCurrentProductIndex } = useProductStore();
  
  const products = [
    {
      suffix: "VM",
      description: "Virtual Private Server hosting with seamless scaling and deployment options.",
      icon: <FiServer className="text-blue-primary text-2xl" />
    },
    {
      suffix: "GPT",
      description: "AI API service featuring powerful language models for your applications.",
      icon: <FiCpu className="text-blue-primary text-2xl" />
    },
    {
      suffix: "Web",
      description: "Web proxy service ensuring secure and efficient content delivery.",
      icon: <FiGlobe className="text-blue-primary text-2xl" />
    },
    {
      suffix: "Code",
      description: "Deployment platform for continuous integration and delivery.",
      icon: <FiCode className="text-blue-primary text-2xl" />
    }
  ];

  // smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Simple product rotation interval
    const interval = setInterval(() => {
      setCurrentProductIndex((currentProductIndex + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentProductIndex, products.length, setCurrentProductIndex]);

  const currentProduct = products[currentProductIndex];

  const handleGetStarted = () => {
    toast.success("Welcome aboard! Let's get started.", {
      icon: '🚀',
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen font-[var(--font-sans)]">
      {/* Toast notifications */}
      <Toaster position="top-center" />
      
      {/* Hero Section - adjusted to be more transparent */}
      <header className="relative py-36 px-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8 items-start"
            >
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                Make the Cloud <span className="text-blue-light">Open Source</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl opacity-90">
                Experience transparent, accessible cloud services without vendor lock-in.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  className="bg-white text-blue-primary hover:bg-blue-100 text-lg py-6 px-12 rounded-full"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border border-blue-primary text-white hover:bg-blue-900/50 text-lg py-6 px-12 rounded-full"
                >
                  View Products
                </Button>
              </div>
            </motion.div>
            
          
          </div>
        </div>
      </header>

      {/* Services Banner */}
      <Marquee className="bg-blue-dark/80 backdrop-blur-sm text-white py-3" speed={40} gradient={false}>
        <div className="flex gap-16 mx-8">
          <span>VPS Hosting</span>
          <span>•</span>
          <span>Web Proxy</span>
          <span>•</span>
          <span>AI API</span>
          <span>•</span>
          <span>Deployment Platform</span>
          <span>•</span>
          <span>Open Source Cloud</span>
          <span>•</span>
        </div>
      </Marquee>

      {/* Product Carousel Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-transparent to-blue-900/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col items-center">
            <motion.div
              className="flex items-center text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-blue-primary">Any</span>
              <div className="h-[80px] overflow-hidden ml-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProductIndex}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-white"
                  >
                    {currentProduct.suffix}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Product Detail Card */}
          <div className="flex flex-col md:flex-row gap-14 items-center">
            <motion.div
              key={`desc-${currentProductIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`product-title-${currentProductIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="card p-8 backdrop-blur-sm"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-primary p-3 rounded-full w-14 h-14 flex items-center justify-center mr-4">
                      {currentProduct.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Any{currentProduct.suffix}
                    </h3>
                  </div>
                  <p className="text-lg text-foreground/80 mb-8">
                    {currentProduct.description}
                  </p>
                  <Button className="bg-blue-primary text-white hover:bg-blue-600 group"
                    onClick={() => toast.success(`Exploring Any${currentProduct.suffix}!`)}>
                    <span>Learn More</span>
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Card for video placeholder */}
            <motion.div
              key={`video-${currentProductIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 aspect-video"
            >
              <div className="card rounded-xl shadow-lg overflow-hidden h-full">
                <div className="w-full h-full flex items-center justify-center bg-blue-light">
                  <p className="text-blue-dark text-lg font-medium">
                    Any{currentProduct.suffix} Demo Video
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-14 gap-3">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentProductIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentProductIndex ? "bg-blue-primary" : "bg-blue-dark"
                }`}
                aria-label={`View Any${products[idx].suffix}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-8 bg-transparent values-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-20">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-dark/50 backdrop-blur-sm border border-blue-800/60 mb-6">
              <span className="text-blue-300 text-sm font-medium">Our Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white values-title">
              Centralized. Modern. Innovative. <span className="text-gradient">Open Source</span>.
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-foreground/80">
              We are dedicated to creating modern cloud services that are centralized, innovative, and transparent.
            </p>
          </div>
          
          <Separator className="bg-blue-900/50 h-[1px] w-full my-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {["Transparent", "Scalable", "Community-Driven"].map((value, i) => (
              <motion.div 
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-blue-dark/30 rounded-xl backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-3 text-white">{value}</h3>
                <p className="text-foreground/80">
                  Our commitment to {value.toLowerCase()} solutions means you're always in control.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 px-8 bg-blue-light/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-dark">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 products-grid">
            {products.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`card transition-all card-hover product-card ${
                  product.suffix === currentProduct.suffix 
                    ? "border-2 border-blue-primary border-glow bg-blue-800" 
                    : ""
                }`}
              >
                <div className="bg-blue-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {product.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Any{product.suffix}</h3>
                <p className="text-foreground/80 mb-4 text-sm">
                  {product.description}
                </p>
                <Link 
                  href={`/${product.suffix.toLowerCase()}`} 
                  className="text-blue-primary font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast(`Navigating to Any${product.suffix}`, { icon: '🔗' });
                  }}
                >
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-blue-primary/90 to-blue-light/90 backdrop-blur-sm text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission to Make the Cloud Open Source
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Experience innovative, transparent, and accessible cloud services.
          </p>
          <Button 
            className="bg-white text-blue-primary hover:bg-blue-100 text-lg py-6 px-10 rounded-full"
            onClick={handleGetStarted}
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}