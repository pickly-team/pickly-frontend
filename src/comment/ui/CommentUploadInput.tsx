import { ChangeEventHandler, useState } from 'react';
import Input from '@/common-ui/Input';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Icon from '@/common-ui/assets/Icon';

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
        <Icon name={'arrow-circle-up-white'} size={'l'} />
      </button>
    </Container>
  );
};

export default CommentUploadInput;

const Container = styled.form`
  display: flex;
  column-gap: 10px;
  align-items: center;
  padding: 10px;
  background-color: ${theme.colors.grey900};
`;

const StyledInput = styled(Input)`
  ::placeholder {
    color: ${theme.colors.grey800};
  }
`;
