// "use client";

// import { useState } from "react";

// import LikeButton from "./LikeButton";
// import CommentButton from "./CommentButton";
// import RepostButton from "./RepostButton";

// type Props = {
//   projectId: number
// };

// function Interactions({
//   projectId
// }: Props) {
//   const [interacted, setInteracted] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   return (
//     <ul className="mt-3 flex justify-around w-full max-w-lg mx-auto">
//         <LikeButton projectId={projectId} initialCount={projectData.likes} />
//         <CommentButton projectId={projectId} initialCount={projectData.comments} />
//         <RepostButton projectId={projectId} initialCount={projectData.reposts} />
//       </ul>
//   );
// }

// export default Interactions;

// {/* <li
//       className={`flex items-center gap-1 cursor-pointer`}
//       onClick={() => setInteracted(!interacted)}>
//       <p
//         style={{
//           backgroundColor: hovered ? color : "",
//           color: hovered ? colorText : "",
//         }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         className={`p-2 rounded-full`}>
//         {interacted ? clicked : icon}
//       </p>

//       {projectData && (
//         <p style={{ color: hovered ? colorText : "" }}>
//           {projectData.key.count()}
//           {/* {projectData[key].count} */}
//         </p>
//       )}
//     </li> */}
