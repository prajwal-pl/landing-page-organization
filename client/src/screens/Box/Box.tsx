import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { getSectionOrder } from "../../services/api";

export const Box = (): JSX.Element => {
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "hero",
    "ourStory",
    "coachingServices",
    "meetCoach",
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchSectionOrder = async () => {
      try {
        setIsLoading(true);
        const data = await getSectionOrder();
        if (data && data.sections) {
          setSectionOrder(data.sections);
        }
      } catch (error) {
        console.error("Error fetching section order:", error);
        // Fall back to default order if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionOrder();
  }, []);

  // Map section IDs to their actual components
  const sectionComponents: Record<string, JSX.Element> = {
    hero: <HeroSection />,
    ourStory: <OurStorySection />,
    coachingServices: <CoachingServicesSection />,
    meetCoach: <MeetCoachSection />,
  };

  if (isLoading) {
    // You could add a loading spinner here if desired
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

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

        {/* Render sections based on the order from the database */}
        {sectionOrder.map((sectionId, index) => (
          <React.Fragment key={sectionId}>
            {sectionComponents[sectionId]}

            {/* Insert partners section after the first section */}
            {index === 0 && (
              <section className="w-full flex justify-center mt-20 mb-16 px-4 overflow-x-auto">
                <div className="flex items-center gap-8 min-w-max">
                  {partnerLogos.map((logo, logoIndex) => (
                    <img
                      key={logoIndex}
                      className="object-contain"
                      style={{ width: logo.width, height: logo.height }}
                      alt={logo.alt}
                      src={logo.src}
                    />
                  ))}
                </div>
              </section>
            )}
          </React.Fragment>
        ))}

        {/* Admin dashboard link widget - small, unobtrusive in bottom-right corner */}
        <Link
          to="/admin"
          className="fixed bottom-5 right-5 w-10 h-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-50"
          title="Admin Dashboard"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L12 8M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8ZM16 20C16 17.7909 14.2091 16 12 16C9.79086 16 8 17.7909 8 20M15.5 14C18.5376 14 21 16.4624 21 19.5V22H3V19.5C3 16.4624 5.46243 14 8.5 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
