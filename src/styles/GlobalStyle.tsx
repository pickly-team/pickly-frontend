import { css, Global } from '@emotion/react';
import { theme } from './theme';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        scroll-behavior: smooth;
        -webkit-tap-highlight-color: transparent;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      input,
      textarea,
      button,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: inherit;
        font: inherit;
        color: ${theme.colors.white};
        font-family: 'NanumSquareRoundR', 'NanumSquareRoundB', sans-serif;
        vertical-align: baseline;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      html {
        background-color: ${theme.colors.black};
      }
      body {
        -ms-overflow-style: none !important; /* IE and Edge */
        scrollbar-width: none !important; /* Firefox */
      }

      ol,
      ul {
        list-style: none;
      }
      a {
        background-color: transparent;
        text-decoration: none;
        outline: none;
        color: inherit;
        &:active,
        &:hover {
          text-decoration: none;
          color: inherit;
          outline: 0;
        }
        -webkit-tap-highlight-color: transparent;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        border: none;
        background: none;
        padding: 0;
        user-select: none;
        cursor: pointer;
        white-space: nowrap;
        letter-spacing: inherit;
        font: inherit;
        color: inherit;
        -webkit-tap-highlight-color: transparent;
      }
      @font-face {
        font-family: 'NanumSquareRoundB';
        src: url('/fonts/NanumSquareRoundB.woff2') format('woff2'),
          url('/fonts/NanumSquareRoundB.woff') format('woff'),
          url('/fonts/NanumSquareRoundB.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'NanumSquareRoundR';
        src: url('/fonts/NanumSquareRoundR.woff2') format('woff2'),
          url('/fonts/NanumSquareRoundR.woff') format('woff'),
          url('/fonts/NanumSquareRoundR.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `}
  />
);
export default GlobalStyle;
