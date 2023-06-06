import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const useApi = async (url, method = "GET", body = false) => {
  let data = [];
  let error = null;
  try {
    const { user } = await getServerSession(authOptions);

    // Remove the first slash from the url
    url = url.replace(/^\/|\/$/g, "");

    // Set up the options of the request
    let options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    // Make the request
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}`,
      options
    );

    // Get the data
    const data = await res.json();

    return { data, error };
  } catch (error) {
    return { data, error };
  }
};
