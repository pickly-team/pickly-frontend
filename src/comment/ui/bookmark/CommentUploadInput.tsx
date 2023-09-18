import { ChangeEventHandler, MouseEvent, useEffect } from 'react';
import Input from '@/common-ui/Input';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import useCommentStore from '@/store/comment';
import IconButton from '@/common/ui/IconButton';
import { usePOSTCommentQuery, usePUTCommentQuery } from '@/comment/api/Comment';
import { useParams } from 'react-router-dom';
import useAuthStore from '@/store/auth';

const CommentUploadInput = () => {
  const { memberId } = useAuthStore();
  const { id } = useParams() as { id: string };
  const { mode, comment, setComment, initComment } = useCommentStore();
  const { id: bookmarkId } = useParams<{ id: string }>();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const onCloseCommentEdit = () => {
    initComment();
  };

  const { mutate: postComment } = usePOSTCommentQuery({
    bookmarkId: bookmarkId ?? '',
    initComment,
  });
  const { mutate: editComment } = usePUTCommentQuery({
    bookmarkId: bookmarkId ?? '',
    initComment,
  });

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (mode === 'CREATE') {
      postComment({
        bookmarkId: Number(id),
        memberId: memberId,
        postData: {
          content: comment.content,
        },
      });
    }
    if (mode === 'EDIT' && comment.id) {
      editComment({
        commentId: comment.id,
        memberId,
        putData: {
          content: comment.content,
        },
      });
    }
  };

  // 페이지 이동 시 댓글 초기화
  useEffect(() => {
    setComment('');
  }, [bookmarkId]);

  return (
    <Container onSubmit={onSubmit}>
      <StyledInput
        value={comment.content}
        onChange={onChange}
        backgroundColor={'black'}
        placeholder="댓글을 입력하세요"
      />
      {mode === 'CREATE' && (
        <IconButton name="check-circle" size="l" type="submit" />
      )}
      {mode === 'EDIT' && (
        <>
          <IconButton
            name="close-circle"
            onClick={onCloseCommentEdit}
            size="l"
            type="button"
          />
          <IconButton name="check-circle" size="l" onClick={onSubmit} />
        </>
      )}
    </Container>
  );
};

export default CommentUploadInput;

const Container = styled.form`
  display: flex;
  align-items: center;
  column-gap: ${getRem(10)};
  padding: ${getRem(10)};
  background-color: ${theme.colors.grey900};
`;

const StyledInput = styled(Input)`
  ::placeholder {
    color: ${theme.colors.grey800};
  }
`;
