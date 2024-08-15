import React from "react";

type SpinnerProps = {
  size?: number;
  color?: string;
};

export default function Spinner({
  size = 10,
  color = "text-sky-500",
}: SpinnerProps) {
  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-t-2`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></div>
    </div>
  );
}
