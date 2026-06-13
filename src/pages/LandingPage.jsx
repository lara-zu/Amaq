import { useEffect } from "react";
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import StatsSection from "../components/landing/StatsSection";
import StudentWorldSection from "../components/landing/StudentWorldSection";
import TeacherSection from "../components/landing/TeacherSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import useScrollReveal from "../hooks/useScrollReveal";

const LandingPage = () => {
  useScrollReveal();

  return (
    <div className="w-full">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <StudentWorldSection />
      <TeacherSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
