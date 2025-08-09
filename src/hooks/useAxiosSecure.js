import axios from "axios";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "https://b11a11-server-side-sohanpk24.vercel.app",
    withCredentials: true,
  });

  return instance;
};

export default useAxiosSecure;
