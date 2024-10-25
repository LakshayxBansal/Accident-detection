"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const Carousel = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const scrollerContent = Array.from(scrollerRef.current.children);
    // Duplicate items for infinite scrolling effect
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current.appendChild(duplicatedItem);
    });

    // Set direction and speed
    containerRef.current.style.setProperty("--animation-duration", speed === "fast" ? "10s" : speed === "normal" ? "20s" : "30s");
    containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");

    setStart(true);
  }, [items, direction, speed]);

  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Adjust based on item count */
          }
        }

        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
        }

        .scroller {
          overflow: hidden;
          position: relative;
        }

        .card {
          border: 3px solid; /* Set border thickness */
          border-radius: 0.75rem; /* Adjust border radius */
          background: linear-gradient(180deg, var(--slate-800), var(--slate-900));
          padding: 24px; /* Padding for spacing */
          display: flex; /* Flexbox for alignment */
          flex-direction: column; /* Vertical alignment */
          justify-content: center; /* Center vertically */
          align-items: center; /* Center horizontally */
          color: inherit; /* Inherit text color */
          height: 250px
        }

        /* Light mode styles */
        .light-mode .card {
          border-color: var(--blue-500); /* Blue border for light mode */
          color: var(--blue-500); /* Text color for light mode */
        }

        /* Dark mode styles */
        .dark-mode .card {
          border-color: var(--green-300); /* Green border for dark mode */
          color: var(--green-300); /* Text color for dark mode */
        }
      `}</style>

      <div
        ref={containerRef}
        className={cn("scroller relative z-20 max-w-7xl overflow-hidden", className)}
      >
        <ul
          ref={scrollerRef}
          className={cn("flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap", start && "animate-scroll", pauseOnHover && "hover:[animation-play-state:paused]")}
        >
          {items.map((item) => (
            <li
              className="w-[350px] max-w-full relative flex-shrink-0 md:w-[450px] card"
              key={item.name}
            >
              <blockquote className="text-center">
                <span className="relative z-20 text-sm leading-[1.6] font-normal">{item.quote}</span>
                <div className="relative z-20 mt-6 flex flex-col items-center">
                  <span className="text-sm leading-[1.6] font-semibold">{item.name}</span> {/* Bold name */}
                  <span className="text-sm leading-[1.6] font-normal">{item.title}</span>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Carousel;

