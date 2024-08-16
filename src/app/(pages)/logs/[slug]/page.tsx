"use client";

import { useSocket } from "@/socket/socket";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const page = () => {
  // connect to the socket server
  // @ts-ignore
  const { socket } = useSocket();

    // logs array
    const [logs, setLogs] = useState<string[]>([
      "virtual environment created",
      "Running Container",
      "Project cloneing",
    ]);

  // slug
  const { slug } = useParams();

  const logContainerRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLElement>(null);

  // functions
  // socket handlers
  const handleSocketIncommingMessage = useCallback((message: string) => {
    const { log } = JSON.parse(message);
    setLogs((prev) => [...prev, log]);
    logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);


  // useeffects
  useEffect(() => {
    socket.on("message", handleSocketIncommingMessage);


    return () => {
      socket.off("message", handleSocketIncommingMessage);
    };
  }, [handleSocketIncommingMessage]);

  // render jsx
  return (
    <div className="w-screen h-screen bg-[#1C1C1C] container mx-auto text-white flex flex-col justify-center items-center">
      <div className="w-full h-12 flex justify-between items-center">
        <Link
          href="/dashbord"
          className=" rounded-full bg-gradient-to-br from-white via-gray-300 to-white p-2 text-black font-extrabold hover:via-gray-800 hover:text-white"
        >
          <IconArrowLeft />
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
          viewport={{ once: true }} className="text-[2.5rem] sm:text-[4rem] font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-slate-300  to-green-500">
        ALL Logs appear hear
      </motion.h1>
      <div className="max-w-md w-full flex flex-col gap-y-3 my-3 justify-center items-center mx-auto py-5 mt-2 text-white bg-slate-900  px-2 rounded-lg">
        Preview URL
        <br />
        <a
          target="_blank"
          className=" bg-sky-950 px-3 py-2 rounded-lg text-white"
          href={`https://vercel-clone-s3-ritesh.s3.ap-south-1.amazonaws.com/__outputs/${slug}/index.html`}
        >
          {`https://${slug}`}
        </a>
      </div>
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
          viewport={{ once: true }} className="w-full md:w-[800px] h-[400px] p-[3px] bg-gradient-to-br from-pink-600 via-purple-600 to-yellow-600 rounded-xl">
        <div className="w-full h-full bg-black rounded-xl p-2 overflow-y-scroll">
          <pre className="flex flex-col gap-1">
            {logs.map((log, i) => (
              <code
                className="text-green-500 text-xl"
                ref={logs.length - 1 === i ? logContainerRef : demoRef}
                key={i}
              >{`> ${log}`}</code>
            ))}
          </pre>
        </div>
      </motion.div>
    </div>
  );
};

export default page;
