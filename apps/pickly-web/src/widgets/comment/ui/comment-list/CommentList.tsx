import { useGETCommentListQuery } from '@/widgets/comment/api/Comment';
import BlankItem from '@/shared/ui/BlankItem/BlankItem';
import useAuthStore from '@/shared/store/auth';
import CommentItem from './CommentItem';
import styled from '@emotion/styled';
import { getRem } from '@pickly/design-system';

const CommentList = () => {
  const { memberId } = useAuthStore();
  const { data: commentList } = useGETCommentListQuery({
    userId: memberId,
  });
  return (
    <CommentListWrapper>
      {!commentList?.length && <BlankItem page="COMMENT" />}
      {!!commentList &&
        commentList.map((comment) => (
          <CommentItem
            key={comment.id} // 변경이 되었는지 안되었는지 판단 여부
            profileEmoji={comment.profileEmoji}
            bookmarkId={comment.bookmarkId}
            title={comment.bookmark}
            content={comment.content}
            nickName={comment.member}
            category={comment.category}
            updatedAt={Number(comment.createdTimestamp)}
          />
        ))}
    </CommentListWrapper>
  );
};

export default CommentList;

const CommentListWrapper = styled.div`
  > * + * {
    margin-top: ${getRem(10)};
    margin-bottom: ${getRem(10)};
  }
  min-height: 80dvh;
`;
