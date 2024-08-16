"use client";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deploy } from "@/apiFunctions/deploy/Deploy";
import { loadingStates } from "@/data/constant";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { useSocket } from "@/socket/socket";

export function DeployJsx() {
  // states
  const [gitURL, setGitURL] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loding, setLoding] = useState<boolean>(false);
  const [buildFolder, setBuildFolder] = useState<string>("");
  const [isProjectDeploying, setIsProjectDeploying] = useState<boolean>(false);
  const [socketSlug, setSocketSlug] = useState<string>("");

  // @ts-ignore
  const { socket } = useSocket();
  const route = useRouter();

  useEffect(() => {
    if (!socketSlug) return;
    socket.emit("subscribe", `logs:${socketSlug}`);
  }, [socketSlug]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
    setError("");
  }, [error]);

  useEffect(() => {
    if (isProjectDeploying) {
      setTimeout(() => {
        setIsProjectDeploying(false);
        route.push(`logs/${socketSlug}`);
      }, loadingStates.length * 2200);
    }
  }, [isProjectDeploying]);

  // functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deploy({
      gitURL,
      buildFolder,
      slug: "",
      setLoding,
      setError,
      route,
      toast,
      setIsProjectDeploying,
      setSocketSlug,
    });
  };

  // render jsx
  return (
    <div className="max-w-md w-full  mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl text-neutral-200">SwiftDeploy</h2>
      <p className=" text-sm max-w-sm mt-2 text-neutral-300">
        deploy your project.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="git">GIT URL</Label>
          <Input
            id="git"
            placeholder="https://github.com/swiftdeploy/demo.git"
            type="text"
            value={gitURL}
            onChange={(e) => setGitURL(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="git">Project Type</Label>
          <select
            onChange={(e) => setBuildFolder(e.target.value)}
            className="flex h-10 w-full border-none bg-zinc-800 text-white  rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400"
          >

            <option value="">select project type</option>
            <option value="build">React</option>
            <option value="dist">Vite</option>
            <option value="normal">HTML CSS JS</option>
          </select>
        </LabelInputContainer>

        <button
          disabled={loding}
          className="bg-gradient-to-br relative group/btn text-white  from-zinc-900 to-zinc-900  block bg-zinc-800 w-full  rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Deploy &rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isProjectDeploying}
        duration={2200}
      />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
