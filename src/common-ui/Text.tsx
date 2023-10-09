/* eslint-disable react-hooks/rules-of-hooks */
import { ColorType, theme } from '@/styles/theme';
import { SerializedStyles, css } from '@emotion/react';
import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

export type TextProps = {
  weight?: 'bold' | 'regular';
  fontSize?: string | number;
  color?: ColorType;
  children?: ReactNode;
  css?: SerializedStyles;
} & HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement>;

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
  css: cssProp,
}: Omit<TextProps, 'children' | 'fonSize'> & { fontSize: string | number }) =>
  css`
    font-size: ${typeof fontSize === 'number' ? `${fontSize}rem` : fontSize};
    color: ${theme.colors[color]};
    font-family: ${weight === 'bold'
      ? 'NanumSquareRoundB'
      : 'NanumSquareRoundR'};
    ${cssProp}
  `;

const P: FunctionComponent<TextProps> = ({
  weight = 'regular',
  fontSize = 1,
  color,
  children,
  ...restProps
}) => {
  return (
    <p css={cssText({ color, fontSize, weight })} {...restProps}>
      {children}
    </p>
  );
};

const Span: FunctionComponent<TextProps> = ({
  weight = 'regular',
  fontSize = 1,
  color,
  children = null,
  css: cssProp,
  ...restProps
}) => {
  return (
    <span
      css={cssText({ color, fontSize, weight, css: cssProp })}
      {...restProps}
    >
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
    <div css={cssText({ color, fontSize, weight })} {...restProps}>
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
    <Tag css={cssText({ color, fontSize, weight })} {...restProps}>
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
