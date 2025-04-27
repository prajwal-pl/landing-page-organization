import { Button } from "../../../../components/ui/button";

export const OurStorySection = (): JSX.Element => {
  const paragraphs = [
    "At Mahpatram, we believe in the limitless potential of every individual and the power of collaboration to drive success and well-being.",
    "MAHPATRAM is dedicated to empowering individuals, businesses, and coaches to unlock their full potential. With a focus on transformation and growth, we provide holistic solutions that foster personal and professional excellence.",
  ];

  return (
    <section id="our-story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col space-y-6 max-w-[514px]">
            <h1 className="font-semibold text-[46px] text-[#242527] [font-family:'Poppins',Helvetica] leading-tight">
              Our Story
              <br />
              Who we are
            </h1>

            <div className="flex flex-col space-y-[15px]">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-medium text-lg text-[#c4c4c4] [font-family:'Poppins',Helvetica] leading-normal"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Button className="w-fit px-10 py-5 bg-[#0a71ad] rounded-lg shadow-w text-white font-semibold text-base [font-family:'Poppins',Helvetica]">
              Learn More
            </Button>
          </div>

          <div className="relative">
            <img
              className="w-[300px] h-[300px] md:w-[450px] md:h-[400px] lg:w-[605px] lg:h-[500px] object-cover rounded-lg"
              alt="Mask group"
              src="/mask-group.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
