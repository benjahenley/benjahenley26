import { Spinner } from "./Spinner";

export function SpinnerContainer({ className }: { className?: string }) {
  return (
    <div className={`${className} grid w-full place-items-center h-20 p-6`}>
      <Spinner />
    </div>
  );
}
