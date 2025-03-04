import { FaRegUserCircle } from "react-icons/fa";

type Props = {
  className?: string;
  small?: any;
  image?: any;
};

function SessionProfilePic({ className, small, image }: Props) {
  return (
    <div className={className}>
      <div
        className={`${
          small ? "w-8 h-8 border-transparent grid items-center" : "w-22 h-22"
        } rounded-full overflow-hidden`}>
        {image ? <div></div> : <FaRegUserCircle className=" w-full h-full" />}
      </div>
    </div>
  );
}

export default SessionProfilePic;
