import { render, screen } from '@testing-library/react';
import Text from './Text';

describe('Text test', () => {
  test('Text 컴포넌트는 children(string)을 렌더링한다.', () => {
    //given
    const TEXT = 'Hello World';

    //when
    render(<Text.Div>{TEXT}</Text.Div>);

    //then
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });
  test('Text 컴포넌트 > Header 렌더링 테스트', () => {
    //given && when
    const TEXT = 'Hello World';
    render(<Text.Header level="h1">{TEXT}</Text.Header>);

    //then
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
  test('Text 컴포넌트 > Span 렌더링 테스트', () => {
    //given && when
    const TEXT = 'Hello World';
    render(<Text.Span>{TEXT}</Text.Span>);

    //then
    // span을 특정할 수 없어서 다음과 같이 테스트
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });
  test('Text 컴포넌트 > P 렌더링 테스트', () => {
    //given && when
    const TEXT = 'Hello World';
    render(<Text.P>{TEXT}</Text.P>);

    //then
    // span을 특정할 수 없어서 다음과 같이 테스트
    // expect(screen.getByRole('paragraph')).toBeInTheDocument();
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });
  test('Text 컴포넌트는 weight에 따라 폰트를 렌더링한다.', () => {
    //given
    const weight = 'bold';

    //when
    render(<Text.Div weight={weight}>TEXT</Text.Div>);

    //then
    expect(screen.getByText('TEXT')).toHaveStyle({
      'font-family': 'NanumSquareRoundB',
    });
  });
  test('Text 컴포넌트는 fontSize에 따라 폰트 사이즈를 렌더링한다.', () => {
    //given
    const fontSize = 2;

    //when
    render(<Text.Div fontSize={fontSize}>TEXT</Text.Div>);

    //then
    expect(screen.getByText('TEXT')).toHaveStyle({
      'font-size': '2rem',
    });
  });
  test('Text 컴포넌트는 color에 따라 폰트 색상을 렌더링한다.', () => {
    //given
    const color = 'grey900';

    //when
    render(<Text.Div color={color}>TEXT</Text.Div>);

    //then
    expect(screen.getByText('TEXT')).toHaveStyle({
      color: '#212121',
    });
  });
});
