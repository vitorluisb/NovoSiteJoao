import HeroSection from '@/react-app/components/HeroSection';
import ServicesSection from '@/react-app/components/ServicesSection';
import LoveMessagesSection from '@/react-app/components/LoveMessagesSection';
import VipGroupSection from '@/react-app/components/VipGroupSection';
import ContactCallToAction from '@/react-app/components/ContactCallToAction';

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ServicesSection />
      <LoveMessagesSection />
      <VipGroupSection />
      <ContactCallToAction />
    </div>
  );
}
