"use client";
import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import { TimerProgressProps } from "./timer.types";
import { Size } from "../types/size.type";
import { padWithZero } from "@/utils/string";

const sizes: Record<Size, number> = {
  tiny: 24,
  small: 34,
  normal: 43,
  large: 54,
};

export const TimerProgress: React.FC<TimerProgressProps> = ({
  variant,
  size = "normal",
  className,
  value,
  maxValue,
  children,
  datePart,
  showTitle = true,
}) => {
  const circumference = Math.round(2 * Math.PI * sizes[size]);
  const progress = Math.round(
    circumference - (circumference * value) / maxValue
  );

  const [offset, setOffset] = useState(progress);

  useEffect(() => {
    setOffset(progress);
  }, [progress]);

  const classes = classNames(
    "items-center relative flex flex-col items-center justify-center",
    { [`timer-progress-${variant}`]: variant },
    className
  );

  return (
    <div className={classes} lang="en">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[.25em] font-light text-white text-xl leading-8">
        {children != null ? padWithZero(children?.toString(), 2) : ""}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={`${sizes[size] * 2 + 6}px`}
        height={`${sizes[size] * 2 + 6}px`}
      >
        <defs>
          <linearGradient id="gradientColor">
            <stop offset="0%" stopColor={"var( --color-gradient-first)"}></stop>
            <stop
              offset="100%"
              stopColor={"var( --color-gradient-second)"}
            ></stop>
          </linearGradient>
        </defs>
        <circle
          className="timer-progress-back-bar"
          cx={sizes[size] + 3}
          cy={sizes[size] + 3}
          r={sizes[size]}
          style={{
            strokeDashoffset: 0,
            strokeDasharray: circumference,
            strokeWidth: sizes[size] / 10,
          }}
        />
        <circle
          className="timer-progress-front-bar"
          cx={sizes[size] + 3}
          cy={sizes[size] + 3}
          r={sizes[size]}
          style={{
            strokeDashoffset: offset,
            strokeDasharray: circumference,
            strokeWidth: sizes[size] / 10,
            stroke: "blue", // Set stroke color to blue
          }}
        />
      </svg>
      {showTitle && (
        <label className="timer-progress-date-part">{datePart}</label>
      )}
    </div>
  );
};
