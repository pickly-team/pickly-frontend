import Header from '@/common-ui/Header/Header';
import styled from '@emotion/styled';
import CommentItem from '@/comment/ui/comment-list/CommentItem';
import getRem from '@/utils/getRem';
import { useGETCommentListQuery } from '@/comment/api/Comment';
import useAuthStore from '@/store/auth';
import BlankItem from '@/common-ui/BlankItem';

const CommentPage = () => {
  const { memberId } = useAuthStore();
  const { data: commentList } = useGETCommentListQuery({
    userId: memberId,
  });

  return (
    <>
      <Header title={'댓글 목록'} showBackButton />
      <Body>
        <CommentListWrapper>
          {!commentList?.length && <BlankItem page="COMMENT" />}
          {commentList &&
            commentList.length > 0 &&
            commentList.map((comment) => (
              <CommentItem
                key={comment.id} // 변경이 되었는지 안되었는지 판단 여부
                id={comment.id}
                bookmarkId={comment.bookmarkId}
                title={comment.bookmark}
                content={comment.content}
                nickName={comment.member}
                category={comment.category}
                updatedAt={Number(comment.createdTimestamp)}
              />
            ))}
        </CommentListWrapper>
      </Body>
    </>
  );
};

export default CommentPage;

const Body = styled.div`
  padding: ${getRem(10, 20)};
`;

const CommentListWrapper = styled.div`
  > * + * {
    margin-top: ${getRem(10)};
    margin-bottom: ${getRem(10)};
  }
`;
