import { useGETBookmarkCommentListQuery } from '@/widgets/bookmarks/api/bookmark';
import CommentItem from './CommentItem';
import styled from '@emotion/styled';

import useCommentStore from '@/shared/store/comment';
import { useDELETECommentQuery } from '@/widgets/comment/api/Comment';

import { useParams } from 'react-router-dom';
import BlankComment from './BlankComment';
import useAuthStore from '@/shared/store/auth';
import { getRem } from '@pickly/design-system';
import useBottomSheet from '@/shared/ui/BottomSheet/hooks/useBottomSheet';
import { timeStampToDate } from '@/shared/utils/date/timeConverter';
import BSConfirmation from '@/shared/common/ui/BSConfirmation';

const CommentList = () => {
  // FIRST RENDER
  const { comment, setCommentId, setCommentCount } = useCommentStore();
  // SERVER
  const { memberId } = useAuthStore();
  const { id: bookmarkId } = useParams<{ id: string }>();
  const { data: commentList } = useGETBookmarkCommentListQuery({
    bookmarkId: bookmarkId ?? '',
    memberId,
    setCommentCount,
  });

  // USER INTERACTION
  // 1. 댓글 수정
  const { editComment } = useCommentStore();

  // 2. 댓글 삭제
  const { mutate: deleteComment } = useDELETECommentQuery({
    bookmarkId: bookmarkId ?? '',
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
      {!commentList?.length && <BlankComment />}
      {commentList?.map((comment) => (
        <CommentItem
          key={comment.id}
          memberId={comment.memberId}
          id={comment.id}
          profileEmoji={comment.profileEmoji}
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
  margin-bottom: 10rem;
  padding: 0 ${getRem(20)};
`;
