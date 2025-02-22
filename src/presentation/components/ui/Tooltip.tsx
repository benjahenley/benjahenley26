"use client";

import { useState } from "react";

type TooltipProps = {
  children: React.ReactNode;
  name: string;
};

export default function Tooltip({ children, name }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow-md">
          {name}
        </div>
      )}
    </div>
  );
}
