import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeroSection = (): JSX.Element => {
  // Define statistics data for easy mapping
  const stats = [
    {
      value: "100",
      suffix: "+",
      description: "Expert Coaches",
      width: "w-[143px]",
    },
    {
      value: "30K",
      suffix: "+",
      description: "Lives Changed",
      width: "w-fit",
    },
    {
      value: "50",
      suffix: "+",
      description: "Workshops Conducted",
      width: "w-[210px]",
    },
  ];

  return (
    <section className="w-full min-h-screen pt-24 pb-32 [background:linear-gradient(224deg,rgba(71,71,71,1)_0%,rgba(34,34,34,1)_42%)]">
      {/* Hero Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row mt-16 gap-8">
          <div className="w-full lg:w-1/2">
            <h1 className="[font-family:'Poppins',Helvetica] font-medium text-white text-[40px] lg:text-[64px] tracking-[0] leading-[1.2]">
              Discover Your Inner
              <br />
              Strength and Create
              <br />A Life You Love
            </h1>

            <p className="mt-8 [font-family:'Poppins',Helvetica] font-medium text-[#c4c4c4] text-base lg:text-lg tracking-[0] leading-relaxed">
              Life coaches will guide you through a transformational journey of
              self-discovery, helping you identify your unique gifts and talents
            </p>

            <Button className="mt-12 px-8 py-4 lg:px-10 lg:py-5 rounded-lg shadow-w [background:linear-gradient(127deg,rgba(96,187,238,1)_0%,rgba(10,114,173,1)_100%)] [font-family:'Poppins',Helvetica] font-semibold text-white text-base">
              Get Started
            </Button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[620px] lg:h-[620px] object-contain"
                alt="Element"
                src="/1579099747235-removebg-preview-1.png"
              />
            </div>
          </div>
        </div>

        {/* Stats Section - Added margin-top for spacing */}
        <div className="flex justify-center w-full py-8 mt-10">
          <div className="flex items-center gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-[13px] ${stat.width}`}
              >
                <h3 className="relative self-stretch font-bold text-4xl text-center whitespace-nowrap font-['Poppins',Helvetica] tracking-[0] leading-normal">
                  <span className="text-white">{stat.value}</span>
                  <span className="text-[#2387c0]">{stat.suffix}</span>
                </h3>
                <p className="relative self-stretch font-['Poppins',Helvetica] font-semibold text-[#c4c4c4] text-lg text-center tracking-[0] leading-normal">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Card - Added margin-top for spacing from stats section */}
        <div className="mt-16 flex justify-center">
          <Card className="w-full md:w-[685px] h-auto rounded-[44px_0px_0px_0px] shadow-w [background:linear-gradient(127deg,rgba(57,159,216,1)_0%,rgba(7,117,180,1)_30%,rgba(0,55,86,1)_99%)]">
            <CardContent className="p-4 md:p-5">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="font-bold text-white text-3xl md:text-4xl font-['Poppins',Helvetica]">
                      10+
                    </span>
                    <span className="ml-2 font-medium text-white text-base md:text-lg font-['Poppins',Helvetica]">
                      Years
                    </span>
                  </div>
                  <span className="font-semibold text-white text-xl md:text-2xl font-['Poppins',Helvetica] mt-1">
                    Experience
                  </span>
                </div>

                <div className="max-w-[333px] font-normal text-white text-sm md:text-base font-['Poppins',Helvetica]">
                  True transformation is a balance of mind, body, and purpose.
                  These pillars represent the core areas we help you strengthen.
                  Track your journey and celebrate your growth as you progress
                  toward a more empowered and fulfilled life.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
