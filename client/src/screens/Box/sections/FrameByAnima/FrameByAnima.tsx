import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const FrameByAnima = (): JSX.Element => {
  return (
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
            True transformation is a balance of mind, body, and purpose. These
            pillars represent the core areas we help you strengthen. Track your
            journey and celebrate your growth as you progress toward a more
            empowered and fulfilled life.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};