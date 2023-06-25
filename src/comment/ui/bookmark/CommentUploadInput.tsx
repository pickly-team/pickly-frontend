import { ChangeEventHandler, useState } from 'react';
import Input from '@/common-ui/Input';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';

const CommentUploadInput = () => {
  const [comment, setComment] = useState<string>('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setComment(value);
  };
  return (
    <Container>
      <StyledInput
        value={comment}
        onChange={onChange}
        backgroundColor={'black'}
        placeholder="댓글을 입력하세요"
      />
      <button>
        <Icon name="send" size={'l'} />
      </button>
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
