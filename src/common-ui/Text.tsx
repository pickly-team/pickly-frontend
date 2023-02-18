/* eslint-disable react-hooks/rules-of-hooks */
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

type StrictPropsWithChildren<P = unknown> = P & { children: string };

type HeaderText = {
  type: 'header';
  tag: 'h1' | 'h2' | 'h3';
};

type SpanText = {
  type: 'span';
  tag: 'span';
};

type LiText = {
  type: 'div';
  tag: 'div';
};

type PText = {
  type: 'p';
  tag: 'p';
};

interface TextProps extends StrictPropsWithChildren {
  type: HeaderText | SpanText | LiText | PText;
  weight: 'bold' | 'regular';
  fontSize?: number;
  color?: keyof typeof theme.colors;
}

const cssText = ({
  weight,
  color,
  fontSize,
}: Omit<TextProps, 'type' | 'children' | 'color'> & {
  color: keyof typeof theme.colors;
}) =>
  css`
    font-size: ${fontSize}rem;
    color: ${theme.colors[color]};
    font-family: ${weight === 'bold'
      ? 'NanumSquareRoundB'
      : 'NanumSquareRoundR'};
  `;

const HeaderNode: Record<
  HeaderText['tag'],
  FunctionComponent<
    Omit<TextProps, 'type'> & { color: keyof typeof theme.colors }
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
 * @example
 *  <Text type={{ tag: 'h3', type: 'header' }} weight="bold" color="white">
        이것은 텍스트 컴포넌트 입니다
    </Text>
 */

const Text: FunctionComponent<TextProps> = ({
  type,
  weight,
  fontSize = 24,
  color = 'white',
  children,
}) => {
  if (type.type === 'header') {
    return <>{HeaderNode[type.tag]({ children, color, fontSize, weight })}</>;
  } else {
    return (
      <>
        <type.tag css={cssText({ color, fontSize, weight })}>
          {children}
        </type.tag>
      </>
    );
  }
};

export default Text;
