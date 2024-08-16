import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";
import { SetStateAction } from "react";

interface projects {
  slug: string;
  url: string;
  createdAt: string;
  _id: string;
}

interface pramiters {
  setProjects: React.Dispatch<SetStateAction<projects[]>>;
  setLoding: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  route: AppRouterInstance;
}

export async function projectsHandler(pramitersData: pramiters) {
  try {
    //   extract data
    const { setProjects, setLoding, setError, route } = pramitersData;

    // check data is valid

    const token = localStorage.getItem("token");

    if (!token) {
      setError("please login first.");
      route.push("/login");
      return;
    }

    // set loding true
    setLoding(true);

    // api call
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/projects`,
      {
        token,
      }
    );

    setProjects(data.projects);
    setLoding(false);
  } catch (error) {
    pramitersData.setLoding(false);
    // @ts-ignore
    const errorMessage = error?.response?.data?.error;
    pramitersData.setError(`${errorMessage}`);
  }
}
