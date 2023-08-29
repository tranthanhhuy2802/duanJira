import React from "react";
import { useSelector } from "react-redux";
import FormInformation from "../../Components/FormInformation/FormInformation";

const PageInformation = () => {
  const { hoTen } = useSelector((state) => {
    return state.user;
  });
  console.log();
  return (
    <div className="flex  justify-evenly items-center mt-16">
      {/* animation  */}
      <div className="w-1/2 ml-56">
        <img
          src={hoTen.avatar}
          alt=""
          width={250}
          height={250}
          className="rounded-full"
        />
      </div>
      <div className="w-2/3 ">
        <FormInformation />
      </div>
    </div>
  );
};

export default PageInformation;
