import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GiCircleClaws } from "react-icons/gi";

const SignIn = () => {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const switchMode = () => {
    setIsSignup((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignup && password !== confirmPassword) {
      toast.error("Password does not match");
      setIsLoading(false);
      return;
    }

    const URL = "http://localhost:4000/user";

    try {
      const response = await axios.post(
        `${URL}/${isSignup ? "signup" : "login"}`,
        {
          storeName,
          password,
          storeAddress,
          phoneNumber,
          email,
        }
      );

      if (isSignup) {
        toast.success("User Created Successfully");
      } else {
        setIsLoading(false);
        toast.success(`Welcome ${response?.data.username}`);
        localStorage.setItem("userInfo", JSON.stringify(response?.data));
      }
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center text-2xl">
        <GiCircleClaws />{" "}
        <span className="text-white font-bold">Inventory</span>
        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-10">
          <p
            tabIndex={0}
            // role="heading"
            aria-label="Login to your account"
            className="text-2xl font-extrabold leading-6 text-gray-800"
          >
            Login to your account
          </p>
          <p className="text-sm mt-4 font-medium leading-none text-gray-500 mb-6">
            {isSignup ? "Already have an account?" : "Don't have an account? "}
            <span className="cursor-pointer" onClick={switchMode}>
              {isSignup ? "Sign In" : "Sign Up"}
            </span>
          </p>

          {isSignup && (
            <div>
              <label className="text-sm font-medium leading-none text-gray-800">
                Store Name
              </label>
              <input
                placeholder="enter store name"
                onChange={(e) => setStoreName(e.target.value)}
                value={storeName}
                type="text"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium leading-none text-gray-800">
              Email
            </label>
            <input
              placeholder="e.g: john@gmail.com "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
          </div>
          {isSignup && (
            <div>
              <label className="text-sm font-medium leading-none text-gray-800">
                Store Address
              </label>
              <input
                placeholder="enter store address"
                onChange={(e) => setStoreAddress(e.target.value)}
                value={storeAddress}
                type="text"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
          )}
          {isSignup && (
            <div>
              <label className="text-sm font-medium leading-none text-gray-800">
                Phone Number
              </label>
              <input
                placeholder="enter phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                type="tel"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
          )}
          <div className="w-full">
            <label className="text-sm font-medium leading-none text-gray-800">
              Password
            </label>
            <div className="relative flex items-center justify-center">
              <input
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              <div
                className="absolute right-0 mt-2 mr-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>
          {isSignup && (
            <div className="w-full">
              <label className="text-sm font-medium leading-none text-gray-800">
                Confirm Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  placeholder="re-enter password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <div
                  className="absolute right-0 mt-2 mr-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              aria-label="create my account"
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full flex gap-3 justify-center items-center"
            >
              {isSignup ? "Sign Up" : "Sign In"}
              {isLoading && (
                <svg
                  className="animate-spin h-7 w-7 mr-3 text-white"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="white"
                  />
                  <path
                    d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                    fill="white"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
