import { render } from '@/test/utils';
import SlideItem from '@/common-ui/SlideItem';
import { fireEvent, screen } from '@testing-library/react';

describe('SlideItem test', () => {
  test('main 엘리먼트가 렌더링 된다.', () => {
    //given
    const MAIN = '슬라이드 아이템';

    //when
    render(<SlideItem main={<div>{MAIN}</div>} option={<></>} />);

    //then
    screen.getByText(MAIN);
  });
  test('option 엘리먼트가 렌더링 된다.', () => {
    //given
    const OPTION = '옵션';

    //when
    render(<SlideItem main={<div>Main</div>} option={<div>{OPTION}</div>} />);

    //then
    screen.getByText(OPTION);
  });
  //TODO: cypress로 슬라이드 테스트 추가
  test('mouse event', () => {
    //given
    const MAIN = '슬라이드 아이템';
    const OPTION = '옵션';

    //when
    render(<SlideItem main={<div>{MAIN}</div>} option={<div>{OPTION}</div>} />);
    const element = screen.getByText(MAIN);
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(element, { clientX: -100 });
    fireEvent.mouseUp(element);

    //then
    screen.getByText(OPTION);
  });
  test('touch event', () => {
    //given
    const MAIN = '슬라이드 아이템';
    const OPTION = '옵션';

    //when
    render(<SlideItem main={<div>{MAIN}</div>} option={<div>{OPTION}</div>} />);
    const element = screen.getByText(MAIN);
    fireEvent.touchStart(element, { touches: [{ clientX: 0 }] });
    fireEvent.touchMove(element, { touches: [{ clientX: -100 }] });
    fireEvent.touchEnd(element);

    //then
    screen.getByText(OPTION);
  });
});
