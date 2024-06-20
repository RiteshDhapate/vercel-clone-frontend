import { RegisterJsx } from "@/components/custom/RegisterJsx";

const page = () => {
  return (
    <div className="w-screen h-screen container mx-auto">
      <div className="w-full h-full flex justify-center items-center p-5 md:p-0">
        <RegisterJsx />
      </div>
    </div>
  );
}

export default page