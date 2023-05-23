import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import Button, { ButtonProps } from './Button';

const BottomFixedButton = (props: ButtonProps) => {
  return (
    <StyleFixedButtonWrapper>
      <Button {...props}>{props.children}</Button>
    </StyleFixedButtonWrapper>
  );
};

export default BottomFixedButton;

const StyleFixedButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: ${getRem(480)};
  margin: 0 auto;
  padding: 0 ${getRem(20)};
  bottom: ${getRem(20)};
  padding: 0 ${getRem(20)};
`;
