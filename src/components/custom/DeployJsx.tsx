"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
import { io } from "socket.io-client";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"] });

export function DeployJsx() {
  // states
  const [gitURL, setGitURL] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loding, setLoding] = useState<boolean>(false);
  const [buildFolder, setBuildFolder] = useState<string>("");
  const [isProjectDeploying, setIsProjectDeploying] = useState<boolean>(false);
  const [socketSlug, setSocketSlug] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);

  const logContainerRef = useRef<HTMLElement>(null);

  const socket = useMemo(() => io(`${process.env.NEXT_PUBLIC_SERVER_URL}`), []);
  const route = useRouter();

  // socket handlers
  const handleSocketIncommingMessage = useCallback((message: string) => {
    console.log(`[Incomming Socket Message]:`, typeof message, message);
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
    <div className="w-full h-full">
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
      {/* prevew url */}
      {socketSlug && (
        <div className="max-w-md w-full flex justify-center items-center mx-auto py-5 mt-2 text-white bg-slate-900  px-2 rounded-lg">
          <p>
            Preview URL{" "}
            <a
              target="_blank"
              className="text-sky-400 bg-sky-950 px-3 py-2 rounded-lg"
              href={socketSlug}
            >
              {socketSlug}
            </a>
          </p>
        </div>
      )}

      {/* logs contaner */}
      {logs.length > 0 && (
        <div
          className={`${firaCode.className} text-sm text-green-500 logs-container mt-5 border-green-500 border-2 rounded-lg p-4 h-[300px] overflow-y-auto`}
        >
          <pre className="flex flex-col gap-1">
            {logs.map((log, i) => (
              <code
                ref={logs.length - 1 === i ? logContainerRef : undefined}
                key={i}
              >{`> ${log}`}</code>
            ))}
          </pre>
        </div>
      )}
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
