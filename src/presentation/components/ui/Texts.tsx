type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function PageTitle({ children, className = "" }: Props) {
  return (
    <h2
      className={`${className} text-shadow-lg text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white`}>
      {children}
    </h2>
  );
}

function SectionTitle({ children, className = "", style }: Props) {
  return (
    <h3
      style={style}
      className={`${className} text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100`}>
      {children}
    </h3>
  );
}

function SectionText({ children, className = "" }: Props) {
  return (
    <p
      className={`${className} text-clip text-base md:text-lg font-normal dark:text-gray-300`}>
      {children}
    </p>
  );
}

function ProductTitle({ children, className = "" }: Props) {
  return (
    <h3
      className={`${className} uppercase text-xl font-semibold mt-2 text-gray-800 dark:text-white`}>
      {children}
    </h3>
  );
}

function MainProductTitle({ children, className = "" }: Props) {
  return (
    <h2
      className={`${className} text-gray-800 text-xl md:text-xl dark:text-white font-semibold uppercase`}>
      {children}
    </h2>
  );
}

function MainProductText({ children, className = "" }: Props) {
  return (
    <p
      className={`${className} text-clip text-sm md:text-base font-normal line-clamp-3 text-gray-500 dark:text-gray-300`}>
      {children}
    </p>
  );
}

function PriceText({ children, className = "" }: Props) {
  return (
    <p
      className={`${className} text-md font-bold text-gray-900 dark:text-gray-100`}>
      {children}
    </p>
  );
}

function OptionsText({ children, className = "" }: Props) {
  return (
    <p
      className={`${className} text-base  font-medium text-black dark:text-gray-400`}>
      {children}
    </p>
  );
}

function TweetNameTitle({ children, className = "" }: Props) {
  return (
    <h4
      className={`${className} text-md font-extrabold cursor-pointer text-gray-800 dark:text-white`}>
      {children}
    </h4>
  );
}

function TwitterHandle({ children, className = "" }: Props) {
  return (
    <h4
      className={`${className}text-xs dark:text-gray-500 cursor-pointer text-gray-800 font-normal`}>
      {children}
    </h4>
  );
}

function TextBase({ children, className = "" }: Props) {
  return (
    <p
      className={`${className} text-base lg:text-lg  font-normal text-gray-600 dark:text-gray-400 `}>
      {children}
    </p>
  );
}

export {
  PageTitle,
  ProductTitle,
  SectionTitle,
  SectionText,
  MainProductTitle,
  MainProductText,
  PriceText,
  OptionsText,
  TweetNameTitle,
  TextBase,
  TwitterHandle,
};
