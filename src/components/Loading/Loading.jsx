import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <span
        style={{ width: "40px", height: "40px" }}
        className="loading loading-spinner text-green-600 loading-lg "
      ></span>
    </div>
  );
};

export default Loading;
