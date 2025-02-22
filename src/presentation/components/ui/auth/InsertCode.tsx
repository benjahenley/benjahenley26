"use client";

import { cn } from "@/lib/utils";
import { OTPInput, REGEXP_ONLY_DIGITS, SlotProps } from "input-otp";
import { useId } from "react";

interface InsertCodeProps {
  value: string;
  onChange: (value: string) => void;
}

export default function InsertCode({ value, onChange }: InsertCodeProps) {
  const id = useId();
  return (
    <div className="mb-4 ">
      <OTPInput
        id={id}
        pattern={REGEXP_ONLY_DIGITS}
        containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50 justify-center"
        maxLength={6}
        value={value}
        onChange={onChange}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-white font-medium text-slate-950 shadow-sm shadow-black/5 transition-shadow dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        {
          "z-10 border  border-slate-900 ring-[3px] ring-slate-950/20  dark:border-slate-300 dark:ring-slate-300/20":
            props.isActive,
        }
      )}>
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
