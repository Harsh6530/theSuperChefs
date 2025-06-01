"use client";

import Header from "../components/Header/Header";
import Hero from "../sections/Hero/Hero";
import Services from "../sections/Services/Services";
import Special from "../sections/Special/Special";
import Safety from "../sections/Safety/Safety";
import HowItWorks from "../sections/HowItWorks/HowItWorks";
import Gallery from "../sections/Gallery/Gallery";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import RightSidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const pay = localStorage.getItem("payment");
    if (pay) {
      localStorage.removeItem("payment");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Services />
        <Special />
        <Safety />
        {/* <HowItWorks /> */}
        <Gallery />
        {/* Add more sections here as needed */}
      </main>
      <Footer />
      <RightSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
