import React from 'react';
import { TypewriterEffect } from '../../components/ui/typewriter-effect';

const HomeComp1 = () => {
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
  return (
    <div className="flex flex-col items-center justify-center pb-12 border-b px-4">
      <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10 font-bold">
        The road to safety starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
          Signup
        </button>
      </div>
    </div>
  );
};

export default HomeComp1;
