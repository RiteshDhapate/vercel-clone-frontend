import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

interface pramiters {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  setLoding: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  route: AppRouterInstance;
  toast: any;
}

export async function handleRegister(pramitersData: pramiters) {
  let toastId = "";
  try {
    // extract data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      setLoding,
      setError,
      route,
      toast,
    } = pramitersData;

    // check test cases
    if (!firstName || firstName.length < 3) {
      setError("Invalid first name.");
      return;
    }
    if (!lastName || lastName.length < 2) {
      setError("Invalid last name.");
      return;
    }
    if (!email || email.length < 5) {
      setError("Invalid email name.");
      return;
    }
    if (!password || password.length < 8) {
      setError("password must be at least 8 characters");
      return;
    }
    if (!confirmPassword || confirmPassword.length < 8) {
      setError("confirm password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("password not match");
      return;
    }

    // set loding true
    setLoding(true);
    toastId = toast.loading("Creating user...");


    // api call
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/register`,
      {
        firstName,
        lastName,
        email,
        password,
      }
    );

    setLoding(false);
    toast.dismiss(toastId);
    toast.success("Successfully registered");

    route.push(`/verification/${data.data.id}`);
  } catch (error) {
    pramitersData.setLoding(false);
    pramitersData.toast.dismiss(toastId);
    // @ts-ignore
    const errorMessage = error?.response?.data?.error;
    pramitersData.setError(`${errorMessage}`);
  }
}
