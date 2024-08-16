
import { LoginJsx } from "@/components/custom/LoginJsx";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen container mx-auto">
      <div className="w-full h-12 flex justify-between items-center">
        <Link
          href="/"
          className=" rounded-full bg-gradient-to-br from-white via-gray-300 to-white p-2 text-black font-extrabold hover:via-gray-800 hover:text-white"
        >
          <IconArrowLeft />
        </Link>
      </div>
      <div className="w-full h-full flex justify-center items-center p-5 md:p-0">
        <LoginJsx />
      </div>
    </div>
  );
};

export default page;
