"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconHome, IconVocabulary, IconLayoutDashboard } from "@tabler/icons-react";
export function FloatingNavJSX() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-white" />,
    },
    {
      name: "Dashbord",
      link: "/dashbord",
      icon: <IconLayoutDashboard className="h-4 w-4 text-white" />,
    },
    {
      name: "Documentation",
      link: "/doc",
      icon: <IconVocabulary className="h-4 w-4 text-white" />,
    },
  ];
  return (
      <FloatingNav navItems={navItems} />
  );
}

