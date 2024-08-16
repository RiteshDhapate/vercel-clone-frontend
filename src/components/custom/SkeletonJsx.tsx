import { Skeleton } from "../ui/Skeleton";

const SkeletonJsx = () => {
  return (
    <div className="w-full h-full flex flex-wrap gap-10 justify-center p-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
        <div key={index} className="flex flex-col gap-y-3 ">
          <Skeleton className="w-[150px] h-[35px] bg-zinc-800 rounded-2xl" />
          <Skeleton className="w-[300px] h-[200px] bg-zinc-800 rounded-2xl" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonJsx;
