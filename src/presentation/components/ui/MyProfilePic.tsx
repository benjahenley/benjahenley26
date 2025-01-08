import Image from "next/image";
import { AvatarIcon } from "../../../../public/svgs";

type Props = {
  className?: string;
  small?: any;
};

function ProfilePic({ className, small }: Props) {
  return (
    <div className={className}>
      <div
        className={`${
          small ? "w-10 h-10 border-transparent" : "w-22 h-22"
        } rounded-full overflow-hidden`}>
        {/* <AvatarIcon> */}
        <img
          // width={40}
          // height={40}
          src="/photos/ui/me.png"
          alt="benja"
          className={`${small ? "w-10 h-10" : "w-20.5 h-20.5"}`}
        />
      </div>
    </div>
  );
}

export default ProfilePic;
