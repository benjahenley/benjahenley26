import { Spinner } from "../../feedback/Spinner";

export const PrimaryButton = ({
  loading,
  content,
  className,
  rounded,
}: {
  loading?: boolean;
  content: string;
  className?: string;
  rounded?: boolean;
}) => {
  return (
    <button
      className={`${
        rounded ? "rounded-full" : "rounded-md w-full"
      } inline-flex items-center justify-center gap-2 whitespace-nowrap  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 dark:focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-emerald-500 dark:to-teal-600 text-white shadow-md hover:from-purple-600 hover:to-indigo-700 dark:hover:from-emerald-600 dark:hover:to-teal-700 h-11 px-4 py-2 ${className}`}
      type="submit"
      disabled={loading}>
      {loading ? <Spinner size="sm" /> : content}
    </button>
  );
};

export function SecondaryButton(props: any) {
  return (
    <button
      onClick={props.onClick}
      className="py-1 px-2 border-none rounded text-black">
      <h5 className="text-sm font-medium">{props.children}</h5>
    </button>
  );
}
