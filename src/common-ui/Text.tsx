/* eslint-disable react-hooks/rules-of-hooks */
import { theme } from '@/styles/theme';
import { css, SerializedStyles } from '@emotion/react';
import { FunctionComponent } from 'react';

type StrictPropsWithChildren<P = unknown> = P & { children: string };

type HeaderText = {
  type: 'header';
  tag: 'h1' | 'h2' | 'h3';
};

type SpanText = {
  type: 'content';
  tag: 'span';
};

type LiText = {
  type: 'content';
  tag: 'div';
};

type PText = {
  type: 'content';
  tag: 'p';
};

export type HeaderType = HeaderText | SpanText | LiText | PText;

interface TextProps extends StrictPropsWithChildren {
  type: HeaderType;
  weight?: 'bold' | 'regular';
  fontSize?: number;
  color?: keyof typeof theme.colors;
  customCss?: SerializedStyles;
}

const cssText = ({
  weight,
  color,
  fontSize,
  customCss,
}: Omit<TextProps, 'type' | 'children' | 'color'> & {
  color: keyof typeof theme.colors;
}) =>
  css`
    font-size: ${fontSize}rem;
    color: ${theme.colors[color]};
    font-family: ${weight === 'bold'
      ? 'NanumSquareRoundB'
      : 'NanumSquareRoundR'};
    ${customCss}
  `;

const HeaderNode: Record<
  HeaderText['tag'],
  FunctionComponent<
    Omit<TextProps, 'type'> & { color: keyof typeof theme.colors | 'inherit' }
  >
> = {
  h1: ({ children, color, fontSize, weight }) => (
    <h2 css={cssText({ color, fontSize, weight })}>{children}</h2>
  ),
  h2: ({ children, color, fontSize, weight }) => (
    <h2 css={cssText({ color, fontSize, weight })}>{children}</h2>
  ),
  h3: ({ children, color, fontSize, weight }) => (
    <h2 css={cssText({ color, fontSize, weight })}>{children}</h2>
  ),
} as const;

/**
 *
 * @param type - 태그와 헤더 여부를 지정
 * @param weight - 폰트 굵기
 * @param color - 폰트 색상
 * @param fontSize - 폰트 크기
 * @param customCss - 추가적인 css
 * @example
 *  <Text type={{ tag: 'h3', type: 'header' }} weight="bold" color="white">
        이것은 텍스트 컴포넌트 입니다
    </Text>
 */

const Text: FunctionComponent<TextProps> = ({
  type,
  weight = 'regular',
  fontSize = 1,
  color = 'white',
  children,
  customCss,
}) => {
  if (type.type === 'header') {
    return (
      <>
        {HeaderNode[type.tag]({ children, color, fontSize, weight, customCss })}
      </>
    );
  } else {
    return (
      <>
        <type.tag css={cssText({ color, fontSize, weight, customCss })}>
          {children}
        </type.tag>
      </>
    );
  }
};

export default Text;
