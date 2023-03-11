/* eslint-disable react-hooks/rules-of-hooks */
import { ColorType, theme } from '@/styles/theme';
import { css } from '@emotion/react';
import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

type StrictPropsWithChildren<P = unknown> = P & { children: string };

type TextProps = {
  weight?: 'bold' | 'regular';
  fontSize?: number;
  color?: ColorType;
  children: ReactNode;
} & StrictPropsWithChildren &
  HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement>;

type HeaderType = 'h1' | 'h2' | 'h3';

interface HeaderTextProps extends TextProps {
  level: HeaderType;
}

/**
 * 
 * @param fontSize - rem 단위
 * @example
 *  <Text.div fontSize={1} weight="bold">
        안녕하세요 예시 테스트 div 입니다.
    </Text.div>
 */

const cssText = ({
  weight,
  color = 'white',
  fontSize,
}: Omit<TextProps, 'children'>) =>
  css`
    font-size: ${fontSize}rem;
    color: ${theme.colors[color]};
    font-family: ${weight === 'bold'
      ? 'NanumSquareRoundB'
      : 'NanumSquareRoundR'};
  `;

const P: FunctionComponent<TextProps> = ({
  weight = 'regular',
  fontSize = 1,
  color,
  children,
  ...restProps
}) => {
  return (
    <p {...restProps} css={cssText({ color, fontSize, weight })}>
      {children}
    </p>
  );
};

const Span: FunctionComponent<TextProps> = ({
  weight = 'regular',
  fontSize = 1,
  color,
  children,
  ...restProps
}) => {
  return (
    <span {...restProps} css={cssText({ color, fontSize, weight })}>
      {children}
    </span>
  );
};

const Div: FunctionComponent<TextProps> = ({
  weight = 'regular',
  fontSize = 1,
  color,
  children,
  ...restProps
}) => {
  return (
    <div {...restProps} css={cssText({ color, fontSize, weight })}>
      {children}
    </div>
  );
};

const Header: FunctionComponent<HeaderTextProps> = ({
  level,
  weight = 'regular',
  fontSize = 1,
  color,
  children,
  ...restProps
}) => {
  const Tag = level;
  return (
    <Tag {...restProps} css={cssText({ color, fontSize, weight })}>
      {children}
    </Tag>
  );
};

type TextType = {
  P: FunctionComponent<TextProps>;
  Header: FunctionComponent<TextProps & { level: HeaderType }>;
  Span: FunctionComponent<TextProps>;
  Div: FunctionComponent<TextProps>;
};

const Text: TextType = {
  P,
  Header,
  Span,
  Div,
};

export default Text;
