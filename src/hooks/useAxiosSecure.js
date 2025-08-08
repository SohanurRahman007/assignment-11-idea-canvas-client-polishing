import axios from "axios";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  return instance;
};

export default useAxiosSecure;
