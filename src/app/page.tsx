
import { GlobeJSX } from "@/components/custom/Globe";
import { HeroParallaxJSX } from "@/components/custom/HeroParallax";
import Hero from "@/components/pagesComponents/Hero";

const page = () => {
  return (
    <div className="bg-[#1C1C1C] w-screen overflow-x-hidden">
        <Hero />
        <HeroParallaxJSX />
        {/* <GlobeJSX /> */}
    </div>
  );
};

export default page;

// import { GlobeJSX } from "@/components/custom/Globe";
// import { HeroParallaxJSX } from "@/components/custom/HeroParallax";
// import { MultiStepLoaderJSX } from "@/components/custom/MultiLoderEffect";
// import { AnimatedPinJSX } from "@/components/custom/Pin";
// import { SignupFormJSX } from "@/components/custom/SingupFrom";
// import { StickyScrollRevealJSX } from "@/components/custom/StickyScroll";
// export default function Home() {
//   return (
//     <main className="w-screen">
//       <GlobeJSX />
//       {/* Meaty part - Meteor effect */}
//       {/* <Meteors number={40} /> */}

//       <HeroParallaxJSX />
//       <StickyScrollRevealJSX />
//       <MultiStepLoaderJSX />
//       <AnimatedPinJSX />
//       <div className="bg-black">
//         <SignupFormJSX />
//       </div>
//     </main>
//   );
// }
