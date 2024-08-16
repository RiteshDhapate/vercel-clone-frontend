import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

interface pramiters {
  gitURL: string;
  buildFolder: string;
  slug: string;
  setLoding: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  route: AppRouterInstance;
  toast: any;
  setIsProjectDeploying: React.Dispatch<React.SetStateAction<boolean>>;
  setSocketSlug: React.Dispatch<React.SetStateAction<string>>;
}

export async function deploy(pramitersData: pramiters) {
  let toastId = "";
  try {
    //   extract data
    const {
      gitURL,
      buildFolder,
      slug,
      setLoding,
      setError,
      route,
      toast,
      setIsProjectDeploying,
      setSocketSlug,
    } = pramitersData;

    // check data is valid
    if (!gitURL) {
      setError("Enter valid git URL");
      return;
    }
    if (!buildFolder) {
      setError("Invalid project type client");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized access");
      route.push("/login");
      return;
    }

    // set loding true
    setLoding(true);
    toastId = toast.loading("verifying");

    // api call
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/deploy/deploy`,
      {
        gitURL,
        buildFolder,
        slug,
        token,
      }
    );

      setIsProjectDeploying(true);
      console.log(data.projectSlug);
    setSocketSlug(data.projectSlug);
    console.log(data);
    setLoding(false);
    toast.dismiss(toastId);
    toast.success("project deplloying...");
  } catch (error) {
    console.log(error);
    pramitersData.toast.dismiss(toastId);
    pramitersData.setLoding(false);
    // @ts-ignore
    const errorMessage = error?.response?.data?.error;
    pramitersData.setError(`${errorMessage}`);
  }
}
