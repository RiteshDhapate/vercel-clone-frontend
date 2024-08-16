import axios from "axios";

interface pramiters {
  id: string;
  setResendOtpLoding: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  toast: any;
}
export async function resendOtp(pramitersData: pramiters) {
  let toastId = "";
  try {
    //   extract data
    const { id, setResendOtpLoding, setError, toast } = pramitersData;

    // check id is exited or not
    if (!id) {
      setError("Invalid id");
      return;
    }
    // set loding true
    setResendOtpLoding(true);
    toastId = toast.loading("sending otp...");

    // api call
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/resend-otp`,
      {
        id,
      }
    );

    setResendOtpLoding(false);
    toast.dismiss(toastId);
    toast.success("otp sent successfully");
  } catch (error) {
    pramitersData.toast.dismiss(toastId);
    pramitersData.setResendOtpLoding(false);
    // @ts-ignore
    const errorMessage = error?.response?.data?.error;
    pramitersData.setError(`${errorMessage}`);
  }
}
