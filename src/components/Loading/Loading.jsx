import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <span
        style={{ width: "40px", height: "40px" }}
        className="loading loading-spinner text-orange-600 loading-2xl"
      ></span>
    </div>
  );
};

export default Loading;
