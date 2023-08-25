import React from "react";
import Lottie from "react-lottie";
import * as loginAnimation from "./../../assets/animation/animationLogin.json";
import FormSignUp from "../../Components/FormSignUp/FormSignUp";

const SignUp = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center">
      {/* animation  */}
      <div className="w-1/2">
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
      <div className="w-1/2">
        <FormSignUp />
      </div>
    </div>
  );
};

export default SignUp;
