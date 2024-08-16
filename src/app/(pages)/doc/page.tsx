"use client";

import { StickyScrollRevealJSX } from "@/components/custom/StickyScroll";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const page = () => {
  return (
    <div className="w-screen h-screen container bg-[#1C1C1C] mx-auto">
      <div className="w-full h-full ">
        <div className="w-full h-12 flex justify-between items-center">
          <Link
            href="/"
            className=" rounded-full bg-gradient-to-br from-white via-gray-300 to-white p-2 text-black font-extrabold hover:via-gray-800 hover:text-white"
          >
            <IconArrowLeft />
          </Link>
          {/* deployment buttton */}
          <Link
            href="/deploy"
            className="bg-gradient-to-br from-white via-gray-300 to-white p-2 rounded-xl text-black font-extrabold hover:via-gray-800 hover:text-white"
          >
            Deploy Project
          </Link>
        </div>
        <motion.h1
          initial={{
            y: 120,
            opacity: 0.1,
            scale: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          className="text-[4rem] md:text-[6rem] font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-900 to-white"
        >
          Doc
        </motion.h1>
        <motion.div
          initial={{
            y: 120,
            opacity: 0.1,
            scale: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
        >
          <StickyScrollRevealJSX />
        </motion.div>
      </div>
    </div>
  );
};

export default page;
