import { theme } from '@/styles/theme';
import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import Toggle from './Toggle';

describe('Toggle test', () => {
  beforeEach(() => {
    // given
    const Button1 = '버튼1';
    const Button2 = '버튼2';
    const WithToggleComponent = () => {
      const [select, setSelect] = useState(false);
      const onSetToggle = () => setSelect(true);
      const onUnsetToggle = () => setSelect(false);
      return (
        <Toggle
          offText={Button1}
          onText={Button2}
          isToggle={select}
          setToggleTrue={onSetToggle}
          setToggleFalse={onUnsetToggle}
        />
      );
    };
    render(<WithToggleComponent />);
  });
  describe('Toggle 컴포넌트 렌더링 테스트', () => {
    it('Toggle 컴포넌트의 첫번째 버튼이 렌더링 된다.', () => {
      // given
      const Button1 = '버튼1';

      // when
      const button1 = screen.getByText(Button1);

      // then
      expect(button1).toBeInTheDocument();
    });
    it('Toggle 컴포넌트의 두번째 버튼이 렌더링 된다.', () => {
      // given
      const Button2 = '버튼2';

      // when
      const button2 = screen.getByText(Button2);

      // then
      expect(button2).toBeInTheDocument();
    });
  });
  describe('Toggle 컴포넌트 클릭 테스트', () => {
    it('Toggle 컴포넌트의 버튼을 클릭하면 > 상태값이 토글 된다.', () => {
      // given
      const Button1 = '버튼1';
      const Button2 = '버튼2';

      // when
      const button1 = screen.getByText(Button1);
      const button2 = screen.getByText(Button2);
      expect(button1).toHaveStyle(`color: ${theme.colors.white}`);
      expect(button2).toHaveStyle(`color: ${theme.colors.grey900}`);
      fireEvent.click(button2);

      //then
      expect(button1).toHaveStyle(`color: ${theme.colors.grey900}`);
      expect(button2).toHaveStyle(`color: ${theme.colors.white}`);
    });
    it('off 버튼을 누르면 > setToggleFalse 이벤트가 외부로 전달된다.', () => {
      // given
      const offButtonText = 'off';
      const setToggleFalse = jest.fn();
      // when
      render(
        <Toggle
          offText={offButtonText}
          onText={''}
          isToggle={true}
          setToggleTrue={() => {}}
          setToggleFalse={setToggleFalse}
        />,
      );
      const button = screen.getByText(offButtonText);
      fireEvent.click(button);

      //then
      expect(setToggleFalse).toHaveBeenCalled();
    });

    it('on 버튼을 누르면 > setToggleTrue 이벤트가 외부로 전달된다.', () => {
      // given
      const onButtonText = 'on';
      const setToggleTrue = jest.fn();
      // when
      render(
        <Toggle
          offText={''}
          onText={onButtonText}
          isToggle={false}
          setToggleTrue={setToggleTrue}
          setToggleFalse={() => {}}
        />,
      );
      const button = screen.getByText(onButtonText);
      fireEvent.click(button);

      //then
      expect(setToggleTrue).toHaveBeenCalled();
    });
  });
});
