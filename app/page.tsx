"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiArrowRight, FiGithub, FiMail, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast, Toaster } from "react-hot-toast";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Launch date: November 1, 2025
  const launchDate = new Date('2025-11-01T00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks! We'll notify you when we launch!", { 
        icon: '🚀',
        duration: 4000 
      });
      setEmail("");
    }
  };

  const services = [
    { name: "AnyVM", desc: "VPS Hosting", icon: "🖥️" },
    { name: "AnyGPT", desc: "AI API", icon: "🤖" },
    { name: "AnyWeb", desc: "Web Proxy", icon: "🌐" },
    { name: "AnyCode", desc: "Deployment", icon: "⚡" }
  ];

  return (
    <div 
      className="min-h-screen font-['Chivo_Mono'] relative overflow-hidden bg-background text-foreground"
    >
      {/* Toast notifications */}
      <Toaster position="top-center" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse bg-primary"></div>
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000 bg-accent"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500 bg-secondary"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="pt-8 px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center max-w-6xl mx-auto"
          >
            <div className="flex items-center space-x-4">
              <Image 
                src="/AnyVM-logo.svg" 
                alt="AnyVM Technologies" 
                width={60} 
                height={60}
                className="drop-shadow-lg"
              />
              <h1 className="text-2xl font-bold text-foreground">
                AnyVM Technologies
              </h1>
            </div>
            
            <Link 
              href="https://github.com/anyvm-tech" 
              target="_blank"
              className="transition-colors text-muted-foreground hover:text-foreground"
            >
              <FiGithub className="w-6 h-6" />
            </Link>
          </motion.div>
        </header>

        {/* Main Section */}
        <main className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Hero Content */}
            <div className="mb-16">
              <Badge variant="outline" className="mb-8 px-6 py-3 text-base bg-card/50 border-primary/30 text-foreground">
                <FiClock className="mr-2" />Coming Soon
              </Badge>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-foreground">
                Make the cloud
                <br />
                <span className="bg-gradient-to-r from-[#47b9e7] via-[#37a1e2] to-[#2472b7] bg-clip-text text-transparent hero-glow relative">
                  open-source
                </span>
              </h2>
              <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed font-normal text-muted-foreground">
                We're building innovative cloud services that put developers first. From reliable VPS hosting to cutting-edge AI APIs.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-16">
              <h3 className="text-2xl mb-8 font-normal text-foreground">Launching in:</h3>
              <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="bg-card border-primary/20 rounded-2xl p-6 hover:bg-card/80 transition-all">
                      <CardTitle className="text-4xl md:text-5xl font-bold mb-3 text-foreground">{String(item.value).padStart(2, '0')}</CardTitle>
                      <CardDescription className="text-base font-normal">{item.label}</CardDescription>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Services Preview */}
            <div className="mb-16">
              <h3 className="text-2xl mb-10 font-normal text-foreground">What's Coming:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  >
                    <Card className="bg-card border-primary/20 rounded-xl p-6 hover:bg-card/80 hover:border-primary/40 transition-all cursor-pointer">
                      <div className="text-3xl mb-4">{service.icon}</div>
                      <CardTitle className="font-bold text-base mb-2 text-foreground">{service.name}</CardTitle>
                      <CardDescription className="text-sm font-normal">{service.desc}</CardDescription>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Email Signup */}
            <Card className="max-w-lg mx-auto bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl mb-6 font-normal text-foreground">Get Early Access</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="pl-14 pr-4 py-4 h-14 text-base font-normal bg-input border-primary/20 text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full font-bold py-4 h-14 rounded-xl text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                    Notify Me at Launch
                    <FiArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </form>
                <p className="text-sm mt-6 font-normal text-muted-foreground text-center">
                  No spam, just updates on our launch and early access opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="pb-8 px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="max-w-6xl mx-auto text-center"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm font-normal text-muted-foreground">
                © 2025 AnyVM Technologies. Building the future of open source cloud.
              </p>
              <div className="flex space-x-6">
                <Link 
                  href="https://github.com/anyvm-tech" 
                  target="_blank"
                  className="text-sm font-normal transition-colors text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </Link>
                <Link 
                  href="https://github.com/anyvm-tech/anygpt" 
                  target="_blank"
                  className="text-sm font-normal transition-colors text-muted-foreground hover:text-foreground"
                >
                  AnyGPT
                </Link>
                <button 
                  onClick={() => toast("Contact info coming soon!", { icon: 'ℹ️' })}
                  className="text-sm font-normal transition-colors text-muted-foreground hover:text-foreground"
                >
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        </footer>

      </div>
    </div>
  );
}