import { useGETBookmarkCommentListQuery } from '@/bookmarks/api/bookmark';
import useAuthStore from '@/store/auth';
import CommentItem from './CommentItem';
import styled from '@emotion/styled';
import { timeStampToDate } from '@/utils/date/timeConverter';
import useCommentStore from '@/store/comment';
import { useDELETECommentQuery } from '@/comment/api/Comment';
import BSConfirmation from '@/common/ui/BSConfirmation';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';

const CommentList = () => {
  // FIRST RENDER
  const { userInfo } = useAuthStore();
  const { comment, setCommentId, setCommentCount } = useCommentStore();
  // SERVER
  const { data: commentList } = useGETBookmarkCommentListQuery({
    memberId: userInfo?.id ?? '',
    setCommentCount,
  });

  // USER INTERACTION
  // 1. 댓글 수정
  const { editComment } = useCommentStore();

  // 2. 댓글 삭제
  const { mutate: deleteComment } = useDELETECommentQuery({
    memberId: userInfo?.id ?? '',
  });
  const onClickDeleteComment = () => {
    deleteComment({ commentId: comment.id ?? 0 });
    closeDeleteCommentBS();
  };
  const {
    isOpen: deleteCommentBS,
    open: openDeleteCommentBS,
    close: closeDeleteCommentBS,
  } = useBottomSheet();

  return (
    <CommentListWrapper>
      {commentList?.map((comment) => (
        <CommentItem
          key={comment.id}
          content={comment.content}
          isWriter={comment.isOwnerComment}
          nickname={comment.member}
          updatedAt={timeStampToDate(comment.createdTimestamp)}
          onClickEdit={() =>
            editComment({ content: comment.content, id: comment.id })
          }
          onClickDelete={() => {
            openDeleteCommentBS();
            setCommentId(comment.id);
          }}
        />
      ))}
      <BSConfirmation
        open={deleteCommentBS}
        title="정말로 삭제 할까요?"
        description="삭제된 댓글은 복구할 수 없습니다."
        onConfirm={onClickDeleteComment}
        onCancel={closeDeleteCommentBS}
        onClose={closeDeleteCommentBS}
      />
    </CommentListWrapper>
  );
};

export default CommentList;

const CommentListWrapper = styled.div`
  margin-bottom: 6rem;
`;
