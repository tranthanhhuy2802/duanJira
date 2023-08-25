import React from "react";
import Lottie from "react-lottie";
import * as loginAnimation from "./../../assets/animation/animationLogin.json";
import FormLogin from "../../Components/FormLogin/FormLogin";

const Login = () => {
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
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
