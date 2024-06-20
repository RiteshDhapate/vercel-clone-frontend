
import { LoginJsx } from "@/components/custom/LoginJsx";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen container mx-auto">
      <div className="w-full h-full flex justify-center items-center p-5 md:p-0">
        <LoginJsx />
      </div>
    </div>
  );
};

export default page;
