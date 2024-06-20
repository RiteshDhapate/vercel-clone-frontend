import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

interface pramiters {
  email: string;
  password: string;
  setLoding: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  route: AppRouterInstance;
  toast: any;
}

export async function login(pramitersData: pramiters) {
  let toastId = "";
  try {
    //   extract data
    const { email, password, setLoding, setError, route, toast } =
      pramitersData;

    // check data is valid
    if (!email || email.length < 6) {
      setError("Invalid email");
      return;
    }

    if (!password || password.length < 6) {
      setError("password at least 6 characters");
      return;
    }

    // set loding true
    setLoding(true);
    toastId = toast.loading("login progress");

    // api call
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/login`,
      {
        email,
        password,
      }
    );

      console.log(data);
      
      if (data?.isVerified === false) {
          route.push(`/verification/${data.id}`);
          toast.dismiss(toastId);
          toast.error("complete verification");
          return;
      }
        
    localStorage.setItem("token", data.data.token);

    setLoding(false);
    toast.dismiss(toastId);
    toast.success("login successful");
    route.push("/dashbord");
  } catch (error) {
    console.log(error);
    pramitersData.toast.dismiss(toastId);
    pramitersData.setLoding(false);
    // @ts-ignore
    const errorMessage = error?.response?.data?.error;
    pramitersData.setError(`${errorMessage}`);
  }
}
