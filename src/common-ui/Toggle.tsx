import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Text from './Text';

interface Props {
  firstText: string;
  secondText: string;
  isToggle: boolean;
  setToggleTrue: () => void;
  setToggleFalse: () => void;
}

interface AnimatedProp {
  isToggle: boolean;
}

/**
 *
 * @param isToggle - 토글 상태값
 * @param setToggleTrue - 토글 상태값을 true로 변경하는 함수
 * @param setToggleFalse - 토글 상태값을 false로 변경하는 함수
 * @example
    <Toggle
      firstText='오전'
      secondText='오후'
      isToggle={select}
      setToggleTrue={setToggleTrue}
      setToggleFalse={setToggleFalse}
    />
 */

const Toggle = ({
  firstText,
  secondText,
  isToggle,
  setToggleTrue,
  setToggleFalse,
}: Props) => {
  return (
    <>
      <ToggleUIWrapper>
        <AnimatedLabel isToggle={isToggle} />
        <StyledButton onClick={setToggleFalse} value={firstText}>
          <Text
            type={{ tag: 'span', type: 'content' }}
            color={isToggle ? 'grey900' : 'white'}
            customCss={css`
              transition: color 500ms ease-in-out;
            `}
          >
            {firstText}
          </Text>
        </StyledButton>
        <StyledButton onClick={setToggleTrue} value={secondText}>
          <Text
            type={{ tag: 'span', type: 'content' }}
            color={isToggle ? 'white' : 'grey900'}
            customCss={css`
              transition: color 500ms ease-in-out;
            `}
          >
            {secondText}
          </Text>
        </StyledButton>
      </ToggleUIWrapper>
    </>
  );
};

export default Toggle;

const ToggleUIWrapper = styled.div`
  position: sticky;
  display: flex;
  width: 100%;
  height: 3rem;
  border-radius: 10px;
  background-color: ${theme.colors.white};
`;

const StyledButton = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  transition: color 500ms ease-in-out;
  cursor: pointer;
  z-index: 10;
`;

const AnimatedLabel = styled.label`
  ${(props: AnimatedProp) =>
    props.isToggle === true
      ? css`
          -webkit-transform: translateX(100%);
          transform: translateX(100%);
          transition: 500ms;
          will-change: transition;
          width: 50%;
          border-top-left-radius: 0px;
          border-top-right-radius: 10px;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 10px;
        `
      : css`
          transition: 500ms;
          will-change: transition;
          width: 50%;
          border-top-left-radius: 10px;
          border-top-right-radius: 0px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 0px;
        `}
  height: 3rem;
  content: '';
  position: absolute;
  background-color: ${theme.colors.primary};
  box-sizing: border-box;
`;
