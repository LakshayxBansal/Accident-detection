import React from "react";
import { Vortex } from "../components/ui/vortex";
import { useNavigate } from "react-router-dom";
import { TypewriterEffect } from "./ui/typewriter-effect";

export function VortexDemo() {

  const words = [
    { text : "Explore", className: "text-blue-500 dark:text-green-300" },
    {text : " " ,className: "mr-2" },
    { text : "our ", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "services ", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "and ", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "discover", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "how", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "we", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "can", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "help", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "you", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "stay", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
    { text : "safe.", className: "text-blue-500 dark:text-green-300"},
    {text : " " ,className: "mr-2" },
  ];


  const navigate = useNavigate();
  return (
    (<div
      className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
        The road to safety starts from here
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        Explore our services and discover how we can help you stay safe.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-10 mt-6">
          <button onClick={() => {navigate("/login") }}
            className="px-4 py-2 w-32 bg-cyan-500 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Join now
          </button>
          <button onClick={() => {navigate("/login") }}
            className="px-4 py-2 w-32 bg-cyan-500 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Login
          </button>
        </div>
      </Vortex>
    </div>)
  );
}
