"use client";

import { projectsHandler } from "@/apiFunctions/users/projects";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonJsx from "./SkeletonJsx";
import { IconArrowLeft, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Dashbord = () => {
  // interfaces
  interface projects {
    slug: string;
    url: string;
    createdAt: string;
    _id: string;
  }

  // states
  const [loding, setLoding] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [projects, setProjects] = useState<projects[]>([]);
  const [token, setToken] = useState<string>("");
  
  useEffect(() => { 
    const tokenData = window.localStorage.getItem("token") || "";
    setToken(tokenData);
  },[])
  

  const route = useRouter();
  // projects;

  // functions
  const fetchProject = async () => {
    try {
      await projectsHandler({ setProjects, setLoding, setError, route });
    } catch (error) {
      setError("something went wrong");
    }
  };

  // useeffects
  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
    setError("");
  }, [error]);

  // functions
  function handleLogOut() { 
    localStorage.removeItem("token");
    toast.success("log out successfully");
  }


  // render jsx
  return (
    <div className="w-full h-full">
      <div className="w-full h-12 flex justify-between items-center">
        <Link
          href="/"
          className=" rounded-full bg-gradient-to-br from-white via-gray-300 to-white p-2 text-black font-extrabold hover:via-gray-800 hover:text-white"
        >
          <IconArrowLeft />
        </Link>
        {/* deployment buttton */}
        <div className="flex gap-x-2">
          <Link
            href="/deploy"
            className="bg-gradient-to-br from-white via-gray-300 to-white p-2 rounded-xl text-black font-extrabold hover:via-gray-800 hover:text-white"
          >
            Deploy Project
          </Link>
          {token && (
            <Link
              href="/login"
              onClick={handleLogOut}
              className=" cursor-pointer bg-gradient-to-br from-white via-gray-300 to-white p-2 rounded-xl text-black font-extrabold hover:via-gray-800 hover:text-white"
            >
              <IconLogout />
            </Link>
          )}
        </div>
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
        My Sites
      </motion.h1>
      {loding && <SkeletonJsx />}
      {!loding && (
        <div className="w-full flex flex-wrap justify-center">
          {projects.length === 0 && (
            <motion.h3
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
              className="mt-3 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-300  to-green-500"
            >
              No any project. click on deploy project.
            </motion.h3>
          )}
          {projects.map((item, index) => (
            <motion.a
              initial={{
                scale: 0.8,
                opacity: 0.1,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              viewport={{ once: true }}
              href={`https://vercel-clone-s3-ritesh.s3.ap-south-1.amazonaws.com/__outputs/${item.slug}/index.html`}
              target="_blank"
              key={index}
              className="w-[400px] cursor-pointer h-[100px] p-1 rounded-lg m-2 bg-gradient-to-br from-pink-500 via-gray-500 to-yellow-400"
            >
              <div className="bg-black w-full h-full rounded-lg flex justify-center items-center font-extrabold">
                {item?.slug}
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashbord;
