"use client";

import { useState } from "react";

type Props = {
  icon: React.ReactNode;
  clicked: React.ReactNode;
  text: string;
  color: string;
  colorText: string;
  count: any;
  onClick: () => void;
};

function InteractionItem({
  icon,
  clicked,
  text,
  color,
  colorText,
  count,
}: Props) {
  const [interacted, setInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className={`flex items-center gap-1 cursor-pointer`}
      onClick={() => setInteracted(!interacted)}>
      <p
        style={{
          backgroundColor: hovered ? color : "",
          color: hovered ? colorText : "",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`p-2 rounded-full`}>
        {interacted ? clicked : icon}
      </p>
      <p style={{ color: hovered ? colorText : "" }}>{count}</p>
    </li>
  );
}

export default InteractionItem;
