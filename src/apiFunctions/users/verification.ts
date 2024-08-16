import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

interface pramiters {
  otp: number;
  id: string;
  setVerificationLoding: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  route: AppRouterInstance;
  toast: any;
}

export async function verificationHandler(pramitersData: pramiters) {
  let toastId = "";
  try {
    //   extract data
    const { otp, id, setVerificationLoding, setError, route, toast } =
      pramitersData;

    // check data is valid
    if (!otp || otp.toString().length < 6) {
      setError("Otp must be at least 6 characters");
      return;
    }

    if (!id) {
      setError("Invalid id");
      return;
    }

    // set loding true
    setVerificationLoding(true);
    toastId = toast.loading("verifying otp");

    // api call
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/verify-user`,
      {
        otp,
        id,
      }
    );

    localStorage.setItem("token", data.data.token);

    setVerificationLoding(false);
    toast.dismiss(toastId);
    toast.success("successfully verified");
    route.push("/dashbord");
  } catch (error) {
    pramitersData.toast.dismiss(toastId);
    pramitersData.setVerificationLoding(false);
    // @ts-ignore
    const errorMessage = error?.response?.data?.error;
    pramitersData.setError(`${errorMessage}`);
  }
}
