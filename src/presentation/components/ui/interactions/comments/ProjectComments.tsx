import ProjectComment from "./ProjectComment";
import ProjectCommentInput from "./ProjectCommentInput";

type Props = {
  projectId: number;
  comments: any[];
};

export function ProjectComments({ projectId, comments }: Props) {
  return (
    <div className="comments-section">
      <ProjectCommentInput projectId={projectId} />
      {comments?.length > 0 ? (
        comments.map((comment: any) => (
          <ProjectComment
            {...comment}
            key={comment.id}
            className="comment-item">
            <p>{comment.content}</p>
          </ProjectComment>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}
export default ProjectComments;
