"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { verificationHandler } from "@/apiFunctions/users/verification";
import { resendOtp } from "@/apiFunctions/users/resendOtp";

export function VerificationJsx() {
  // states
  const [otp, setOtp] = useState<number>();
  const [verificationLoding, setVerificationLoding] = useState<boolean>(false);
  const [resendOtpLoding, setResendOtpLoding] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const route = useRouter();
  const params = useParams<{ tag: string; item: string }>();

  // @ts-ignore
  const id = params.id;

  // useeffects
  useEffect(() => {
    if (!error) return;
    toast.error(error);
    setError("");
  }, [error]);

  // functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp || otp === undefined) {
      setError("Invalid otp");
      return;
    }
    await verificationHandler({
      otp,
      id,
      setVerificationLoding,
      setError,
      route,
      toast,
    });
  };


  const handleResentOtp = async () => {
    await resendOtp({id, setResendOtpLoding, setError, toast});
  }

  // render jsx
  return (
    <div className="max-w-md w-full  mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to SwiftDeploy
      </h2>
      <p className=" text-sm max-w-sm mt-2 text-neutral-300">verification</p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="otp">OTP</Label>
          <Input
            id="otp"
            placeholder="000000"
            type="number"
            value={otp}
            // @ts-ignore
            onChange={(e) => setOtp(e.target.value)}
          />
        </LabelInputContainer>

        <button
          disabled={verificationLoding}
          className="bg-gradient-to-br relative group/btn text-white  from-zinc-900 to-zinc-900  block bg-zinc-800 w-full  rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Verify &rarr;
          <BottomGradient />
        </button>
        <div
          onClick={handleResentOtp}
          className="h-10 w-fit cursor-pointer flex items-end pl-2 text-xl text-white underline hover:text-blue-600 transition-all"
        >
          Resend OTP
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
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
