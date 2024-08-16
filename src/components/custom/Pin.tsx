"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";


// interfaces
interface propsInterface{
  slug: string;
}

export function AnimatedPinJSX({slug}: propsInterface) {

  return (
    <div className="h-full w-full flex justify-center items-center relative">
      <PinContainer title={slug} href={`http://${slug}.localhost:8000`}>
        <a
          target="_blank"
          href={`http://${slug}.localhost:8000`}
          className="flex basis-full flex-col  tracking-tight text-slate-100/50  w-[20rem] "
        >
          <h3 className="max-w-xs  font-bold  text-base text-slate-100 text-center">
            {slug}
          </h3>
        </a>
      </PinContainer>
    </div>
  );
}
