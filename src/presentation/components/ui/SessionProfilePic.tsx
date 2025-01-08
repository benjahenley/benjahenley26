import { AvatarIcon } from "../../../../public/svgs";

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
          small ? "w-10 h-10 border-transparent" : "w-22 h-22"
        } rounded-full overflow-hidden`}>
        {image ? <div></div> : <AvatarIcon></AvatarIcon>}
      </div>
    </div>
  );
}

export default SessionProfilePic;
