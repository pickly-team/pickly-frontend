import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import React from 'react';

interface ReportWriteProps {
  value: string;
  isWriteMode: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BookmarkReportWrite = ({
  value,
  isWriteMode,
  onChange,
}: ReportWriteProps) => {
  return (
    <StyleWrapper isWriteMode={isWriteMode}>
      <StyleTextArea value={value} onChange={onChange} />
      <CountText fontSize={getRem(10)}>{`${value.length} / 200자`}</CountText>
    </StyleWrapper>
  );
};

export default BookmarkReportWrite;

interface StyleWrapperProps {
  isWriteMode: boolean;
}

const StyleWrapper = styled.div<StyleWrapperProps>`
  padding: 0 ${getRem(20)};
  opacity: ${({ isWriteMode }) => (isWriteMode ? 1 : 0)};
  transition: all ease 0.3s 0s;
`;

const StyleTextArea = styled.textarea`
  border: none;
  border-radius: ${getRem(10)};
  outline: none;
  resize: none;
  background-color: ${theme.colors.grey900};
  width: 100%;
  height: ${getRem(200)};
  margin-top: ${getRem(15)};
  :focus {
    outline: none;
    background-color: ${theme.colors.grey800};
  }
  padding: ${getRem(15)};
  transition: all ease 0.5s 0s;
`;

const CountText = styled(Text.P)`
  text-align: right;
  margin-top: ${getRem(5)};
`;
