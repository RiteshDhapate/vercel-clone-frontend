"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";


const content = [
  {
    title: "push source code to github",
    description:
      "Pushing source code to GitHub involves uploading your local code repository to a GitHub repository so that it's accessible online. ",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          className="w-full h-full rounded-xl p-2"
          src="/images/git-repo.png"
          width={100}
          height={100}
          alt="github repo"
        />
      </div>
    ),
  },
  {
    title: "Go to Deploy page",
    description:
      "Enter your project github url and click on the deploy button. your deployment will be automatically started.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          className="w-full h-full"
          src="/images/deployment-page.png"
          width={100}
          height={100}
          alt="github repo"
        />
      </div>
    ),
  },
  {
    title: "Logs Details",
    description:
      "During the deployment process of an application or software, real-time logs or output messages generated by the deployment process will be displayed in a specific section or window. These logs provide insights into what is happening during deployment.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <img
          className="w-full h-full object-cover p-2"
          src="/images/logs-page.png"
          width={100}
          height={100}
          alt="github repo"
        />
      </div>
    ),
  },
  {
    title: "Accessing the Deployed Application.",
    description:
      "You can click on the provided URL or copy and paste it into a browser to access the deployed application.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white p-2">
        Click on provided URL or copy and paste it into a browser to access it.
      </div>
    ),
  },
  {
    title: "SwiftDeploy",
    description: "",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        SwiftDeploy
      </div>
    ),
  },
];
export function StickyScrollRevealJSX() {
  return (
    <div className="p-10 bg-black">
      <StickyScroll content={content} />
    </div>
  );
}
