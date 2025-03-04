import { FaComment } from "react-icons/fa";
import { useModal } from "../../../modals/context";

type Props = {
  commentCount: number;
  selected?: boolean;
  onCommentClick: () => void;
};

export function CommentButton({
  commentCount,
  onCommentClick,
  selected,
}: Props) {
  const modal = useModal();

  const handleClick = () => {
    if (selected) {
      modal.openModal("ADD_COMMENT");
    } else {
      onCommentClick();
    }
  };

  return (
    <li
      className="flex items-center gap-1 cursor-pointer"
      onClick={handleClick}>
      <p className="p-2 rounded-full hover:bg-blue-300 bg-opacity-10">
        <FaComment className="" />
      </p>
      <span>{commentCount}</span>
    </li>
  );
}
export default CommentButton;
