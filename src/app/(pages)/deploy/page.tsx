import { DeployJsx } from "@/components/custom/DeployJsx";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#1C1C1C] w-screen h-screen container mx-auto">
      <div className="w-full h-12 flex justify-between items-center">
        <Link
          href="/dashbord"
          className=" rounded-full bg-gradient-to-br from-white via-gray-300 to-white p-2 text-black font-extrabold hover:via-gray-800 hover:text-white"
        >
          <IconArrowLeft />
        </Link>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <DeployJsx />
      </div>
    </div>
  );
};

export default page;
