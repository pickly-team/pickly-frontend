import { ChangeEventHandler, MouseEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@pickly/design-system';
import { getRem, TextArea } from '@pickly/design-system';
import useCommentStore from '@/shared/store/comment';
import IconButton from '@/shared/common/ui/IconButton';
import {
  usePOSTCommentQuery,
  usePUTCommentQuery,
} from '@/widgets/comment/api/Comment';
import { useParams } from 'react-router-dom';
import useAuthStore from '@/shared/store/auth';

const CommentUploadInput = () => {
  const { memberId } = useAuthStore();
  const { id } = useParams() as { id: string };
  const { mode, comment, setComment, initComment } = useCommentStore();
  const { id: bookmarkId } = useParams<{ id: string }>();

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const onCloseCommentEdit = () => {
    initComment();
  };

  const { mutate: postComment, isLoading: isPostLoading } = usePOSTCommentQuery(
    {
      bookmarkId: bookmarkId ?? '',
      initComment,
    },
  );
  const { mutate: editComment, isLoading: isEditLoading } = usePUTCommentQuery({
    bookmarkId: bookmarkId ?? '',
    initComment,
  });

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (isPostLoading || isEditLoading) return;
    if (!comment.content) return;

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
      <TextArea
        value={comment.content}
        onChange={onChange}
        placeholder="댓글을 입력하세요"
        disable={false}
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
  padding: ${getRem(5)} ${getRem(20)};
  background-color: ${theme.colors.grey900};
  border-top-left-radius: ${getRem(15)};
  border-top-right-radius: ${getRem(15)};
  border: 1px solid ${theme.colors.grey800};
  border-bottom: none;
`;
