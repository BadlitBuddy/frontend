import HeroSection from "@/features/marketing/components/HeroSection";
import HowItWorks from "@/features/marketing/components/HowItWorks";
import FeaturesSection from "@/features/marketing/components/FeaturesSection";
import FaqSection from "@/features/marketing/components/FaqSection";
import CtaSection from "@/features/marketing/components/CtaSection";

export default function MarketingPage() {
  return (
    <div className="space-y-28 md:space-y-36">
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      {/* <PricingSection /> */}
      <FaqSection />
      <CtaSection />
    </div>
  );
}
