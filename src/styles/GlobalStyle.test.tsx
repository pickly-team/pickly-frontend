import { matchers } from '@emotion/jest';
import { render, screen } from '@testing-library/react';
import GlobalStyle from './GlobalStyle';
import { theme } from './theme';

expect.extend(matchers);

describe('GlobalStyle test', () => {
  test('폰트 적용 테스트', () => {
    // given
    const text = '폰트 테스트';
    // when
    render(
      <>
        <GlobalStyle />
        <p title="style">{text}</p>
      </>,
    );
    const pTag = screen.getByText(text);
    // then
    expect(pTag).toHaveStyle({
      // eslint-disable-next-line quotes
      'font-family': "'NanumSquareRoundR','NanumSquareRoundB',sans-serif",
    });
  });
  test('배경색 적용 테스트', () => {
    // given & when
    render(
      <>
        <GlobalStyle />
      </>,
    );
    //then
    expect(document.querySelector('html')).toHaveStyle({
      'background-color': `${theme.colors.black}`,
    });
  });
});
