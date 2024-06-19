"use client";

import { motion } from "framer-motion";
import { IconVocabulary, IconArrowDown } from "@tabler/icons-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-screen h-screen bg-[#1C1C1C] container mx-auto">
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        <motion.h1
          initial={{
            y: 120,
            opacity: 0.1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="text-[4rem] md:text-[6rem] text-center font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-900 to-white"
        >
          Deploy your site
        </motion.h1>
        <motion.h1
          initial={{
            y: -100,
            scale: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          whileInView={{
            y: 0,
            scale: 1,
          }}
          viewport={{ once: true }}
          className="text-[2rem] font-bold p-2 rounded-xl text-[#1C1C1C] uppercase bg-gradient-to-br from-pink-300 via-purple-300 to-red-400"
        >
          in just one click.
        </motion.h1>
        <div className="mt-16 flex gap-5">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
          >
            <Link href="/dashbord">
              <button className="py-2 px-5 border text-white text-nowrap rounded-md font-semibold  bg-gradient-to-br from-white/10  to-white/30  hover:scale-95 transition-all">
                Start your project
              </button>
            </Link>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
          >
            <Link href="/doc">
              <button className="py-2 px-5 border rounded-md flex gap-x-2 items-center font-semibold bg-gradient-to-br from-white/10  to-white/30 text-white hover:scale-95 transition-all">
                <IconVocabulary />
                Documentation
              </button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.2,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          className="absolute xs:bottom-10 bottom-10 w-full flex justify-center items-center"
        >
          <a href="#">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                
              >
                <IconArrowDown className="text-white font-bold" />
              </motion.div>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
