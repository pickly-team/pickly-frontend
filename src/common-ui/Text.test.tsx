import { render, screen } from '@testing-library/react';
import Text, { HeaderType } from './Text';

describe('Text test', () => {
  test('Text 컴포넌트는 children을 렌더링한다.', () => {
    //given
    const TEXT = 'Hello World';

    //when
    render(
      <Text type={{ tag: 'h1', type: 'header' }} weight="bold">
        {TEXT}
      </Text>,
    );

    //then
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });
  test('Text 컴포넌트는 type에 따라 태그를 렌더링한다.', () => {
    //given
    const TYPE: HeaderType = { tag: 'h2', type: 'header' };

    //when
    render(
      <Text type={TYPE} weight="bold">
        TEXT
      </Text>,
    );

    //then
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  test('Text 컴포넌트는 weight에 따라 폰트를 렌더링한다. Bold', () => {
    //given
    const weight = 'bold';
    const TEXT = 'Hello World';

    //when
    render(
      <Text type={{ tag: 'h2', type: 'header' }} weight={weight}>
        {TEXT}
      </Text>,
    );

    //then
    expect(screen.getByText(TEXT)).toHaveStyle(
      'font-family: NanumSquareRoundB',
    );
  });
  test('Text 컴포넌트는 weight에 따라 폰트를 렌더링한다. Regular', () => {
    //given
    const TEXT = 'Hello World';

    //when
    render(
      <Text type={{ tag: 'h2', type: 'header' }} weight="regular">
        {TEXT}
      </Text>,
    );

    //then
    expect(screen.getByText(TEXT)).toHaveStyle(
      'font-family: NanumSquareRoundR',
    );
  });

  test('Text 컴포넌트는 fontSize에 따라 폰트 사이즈를 렌더링한다.', () => {
    //given
    const TEXT = 'Hello World';
    const FONTSIZE = 2;

    //when
    render(
      <Text
        type={{ tag: 'h2', type: 'header' }}
        weight="bold"
        fontSize={FONTSIZE}
      >
        {TEXT}
      </Text>,
    );

    //then
    expect(screen.getByText(TEXT)).toHaveStyle('font-size: 2rem');
  });
  test('Text 컴포넌트는 color에 따라 폰트 색상을 렌더링한다.', () => {
    //given
    const TEXT = 'Hello World';
    const COLOR = 'black';

    //when
    render(
      <Text type={{ tag: 'h3', type: 'header' }} weight="bold" color={COLOR}>
        {TEXT}
      </Text>,
    );

    //then
    expect(screen.getByText(TEXT)).toHaveStyle('color: #161617');
  });

  test('Text 컴포넌트는 선언한 tag에 따라 텍스트를 렌더링한다.', () => {
    //given
    const TEXT = 'Hello World';
    const TYPE: HeaderType = { tag: 'span', type: 'content' };

    //when
    render(
      <Text type={TYPE} weight="bold">
        {TEXT}
      </Text>,
    );

    //then
    const spanText = document.querySelector('span');
    expect(spanText).toBeInTheDocument();
  });
  test('지정된 기본 color 색상이 없다면 흰색을 보여준다.', () => {
    //given
    const TEXT = 'Hello World';

    //when
    render(
      <Text type={{ tag: 'span', type: 'content' }} weight="bold">
        {TEXT}
      </Text>,
    );

    //then
    expect(screen.getByText(TEXT)).toHaveStyle('color: #ffffff');
  });
});
