import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { OurStorySection } from "./sections/OurStorySection/OurStorySection";
import { CoachingServicesSection } from "./sections/CoachingServicesSection/CoachingServicesSection";
import { MeetCoachSection } from "./sections/MeetCoachSection/MeetCoachSection";

export const Box = (): JSX.Element => {
  // Navigation menu items
  const navItems = [
    { label: "Home", active: true },
    { label: "Coaching", active: false },
    { label: "Events & Retreat", active: false },
    { label: "About Us", active: false },
    { label: "Courses", active: false },
    { label: "Blogs", active: false },
    { label: "Media & Press", active: false },
    { label: "Contact Us", active: false },
  ];

  // Partner logos
  const partnerLogos = [
    {
      src: "/logo-admf-background-putih-1.png",
      alt: "Logo ADMF background",
      width: "163px",
      height: "45px",
    },
    {
      src: "/logo--1626691788-1.png",
      alt: "Logo",
      width: "143px",
      height: "79px",
    },
    {
      src: "/1280px-holcim-logo-1.png",
      alt: "Element holcim logo",
      width: "126px",
      height: "54px",
    },
    { src: "/logo-mnc-1.png", alt: "Logo mnc", width: "146px", height: "67px" },
    {
      src: "/logo-telkomsel-terbaru-1.png",
      alt: "Logo telkomsel",
      width: "219px",
      height: "120px",
    },
  ];

  return (
    <div className="relative w-full">
      <div className="w-full">
        {/* Navigation Header */}
        <header className="w-full fixed top-0 z-50 bg-[rgba(34,34,34,0.9)]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <img
                className="w-[150px] md:w-[200px] h-auto object-contain"
                alt="Color logo ezgif com"
                src="/color-logo-ezgif-com-webp-to-png-converter-2.png"
              />

              <NavigationMenu className="max-w-none hidden lg:block">
                <NavigationMenuList className="flex gap-8">
                  {navItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        className={`[font-family:'Poppins',Helvetica] text-lg text-center tracking-[0] leading-[normal] ${
                          item.active
                            ? "font-bold text-white"
                            : "font-medium text-[#c4c4c4]"
                        }`}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>

        {/* 1. Hero Section */}
        <HeroSection />

        {/* Partners Section */}
        <section className="w-full flex justify-center mt-20 mb-16 px-4 overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max">
            {partnerLogos.map((logo, index) => (
              <img
                key={index}
                className="object-contain"
                style={{ width: logo.width, height: logo.height }}
                alt={logo.alt}
                src={logo.src}
              />
            ))}
          </div>
        </section>

        {/* 2. Our Story Section */}
        <OurStorySection />

        {/* 3. Coaching Services Section */}
        <CoachingServicesSection />

        {/* 4. Meet Coach Section */}
        <MeetCoachSection />
      </div>
    </div>
  );
};
