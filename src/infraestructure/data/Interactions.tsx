import {
  FaRegComment,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { FiShare } from "react-icons/fi";
import { InteractionItemProps } from "@/infraestructure/interfaces";

const INTERACTIONS: InteractionItemProps[] = [
  {
    icon: <FaRegComment />,
    clicked: <FaComment />,
    text: "Comments",
    key: "comments",
    color: "rgba(26, 155, 240, 0.5)",
    colorText: "rgba(26, 155, 240)",
  },
  {
    icon: <AiOutlineRetweet />,
    clicked: <AiOutlineRetweet />,
    text: "Reposts",
    key: "reposts",
    color: "rgba(0, 186, 124, 0.5)",
    colorText: "rgba(0, 186, 124)",
  },
  {
    icon: <FaRegHeart />,
    clicked: <FaHeart />,
    text: "Likes",
    key: "likes",
    color: "rgba(249, 24, 128, 0.5)",
    colorText: "rgba(249, 24, 128",
  },
  {
    icon: <IoStatsChartOutline />,
    clicked: <IoStatsChart />,
    text: "Stats",
    key: "stats",
    color: "rgba(255, 165, 0, 0.2)",
    colorText: "rgba(255, 165, 0)",
  },
  {
    icon: <FaRegBookmark />,
    clicked: <FaBookmark />,
    text: "Bookmark",
    key: "bookmark",
    color: "rgba(128, 0, 128, 0.2)",
    colorText: "rgba(128, 0, 128)",
  },
  {
    icon: <FiShare />,
    clicked: <FiShare />,
    text: "Share",
    key: "share",
    color: "rgba(255, 215, 0, 0.2)",
    colorText: "rgba(255, 215, 0)",
  },
];

export default INTERACTIONS;
